import { useDb } from '../../db/client'
import { topics, progress, resources, pillars, logEntries } from '../../db/schema'
import { eq, desc } from 'drizzle-orm'

export default defineEventHandler((event) => {
  const db = useDb()
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Slug is required' })
  }

  const topic = db.select().from(topics).where(eq(topics.slug, slug)).get()
  if (!topic) {
    throw createError({ statusCode: 404, statusMessage: 'Topic not found' })
  }

  const pillar = db.select().from(pillars).where(eq(pillars.id, topic.pillarId)).get()
  const prog = db.select().from(progress).where(eq(progress.topicId, topic.id)).get()
  const res = db.select().from(resources).where(eq(resources.topicId, topic.id)).orderBy(resources.order).all()
  const logs = db.select().from(logEntries).where(eq(logEntries.topicId, topic.id)).orderBy(desc(logEntries.date)).all()

  return {
    ...topic,
    pillar: pillar ?? null,
    status: prog?.status ?? 'not_started',
    confidence: prog?.confidence ?? 1,
    startedAt: prog?.startedAt ?? null,
    completedAt: prog?.completedAt ?? null,
    progressNotes: prog?.notes ?? null,
    progressUpdatedAt: prog?.updatedAt ?? null,
    resources: res,
    logEntries: logs,
  }
})
