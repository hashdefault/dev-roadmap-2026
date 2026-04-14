import { useDb } from '../db/client'
import { pillars, topics, progress, logEntries } from '../db/schema'
import { eq, sql, gte, desc } from 'drizzle-orm'

export default defineEventHandler(() => {
  const db = useDb()

  // All topics with progress
  const allTopics = db
    .select({
      topic: topics,
      progress: progress,
    })
    .from(topics)
    .leftJoin(progress, eq(topics.id, progress.topicId))
    .all()

  // Weighted progress: sum(completed_priority) / sum(all_priority)
  let totalWeight = 0
  let completedWeight = 0
  for (const t of allTopics) {
    totalWeight += t.topic.priority
    if (t.progress?.status === 'completed') {
      completedWeight += t.topic.priority
    }
  }
  const overallProgress = totalWeight > 0 ? Math.round((completedWeight / totalWeight) * 100) : 0

  // Current focus (in_progress topics)
  const currentFocus = allTopics
    .filter(t => t.progress?.status === 'in_progress')
    .map(t => ({
      ...t.topic,
      confidence: t.progress?.confidence ?? 1,
      startedAt: t.progress?.startedAt ?? null,
    }))

  // Next up (not_started, sorted by priority desc)
  const nextUp = allTopics
    .filter(t => !t.progress || t.progress.status === 'not_started')
    .sort((a, b) => b.topic.priority - a.topic.priority)
    .slice(0, 5)
    .map(t => t.topic)

  // Last 7 days of log entries
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  const recentLogs = db
    .select()
    .from(logEntries)
    .where(gte(logEntries.date, weekAgo.toISOString().split('T')[0]))
    .orderBy(desc(logEntries.date))
    .all()

  // Daily minutes for sparkline
  const dailyMinutes = db
    .select({
      date: logEntries.date,
      minutes: sql<number>`SUM(${logEntries.durationMinutes})`,
    })
    .from(logEntries)
    .where(gte(logEntries.date, weekAgo.toISOString().split('T')[0]))
    .groupBy(logEntries.date)
    .orderBy(logEntries.date)
    .all()

  // Pillar progress
  const allPillars = db.select().from(pillars).orderBy(pillars.order).all()
  const pillarProgress = allPillars.map(pillar => {
    const pillarTopics = allTopics.filter(t => t.topic.pillarId === pillar.id)
    const total = pillarTopics.length
    const completed = pillarTopics.filter(t => t.progress?.status === 'completed').length

    return {
      ...pillar,
      total,
      completed,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    }
  })

  return {
    overallProgress,
    totalTopics: allTopics.length,
    completedTopics: allTopics.filter(t => t.progress?.status === 'completed').length,
    inProgressTopics: allTopics.filter(t => t.progress?.status === 'in_progress').length,
    currentFocus,
    nextUp,
    recentLogs,
    dailyMinutes,
    pillarProgress,
  }
})
