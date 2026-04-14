import { useDb } from '../../db/client'
import { topics, progress, pillars } from '../../db/schema'
import { eq, and, sql } from 'drizzle-orm'

export default defineEventHandler((event) => {
  const db = useDb()
  const query = getQuery(event)

  const pillarSlug = query.pillar as string | undefined
  const status = query.status as string | undefined
  const depth = query.depth as string | undefined
  const priority = query.priority ? Number(query.priority) : undefined

  let conditions = sql`1=1`

  if (pillarSlug) {
    const pillar = db.select().from(pillars).where(eq(pillars.slug, pillarSlug)).get()
    if (pillar) {
      conditions = sql`${conditions} AND ${topics.pillarId} = ${pillar.id}`
    }
  }

  if (depth) {
    conditions = sql`${conditions} AND ${topics.depth} = ${depth}`
  }

  if (priority) {
    conditions = sql`${conditions} AND ${topics.priority} = ${priority}`
  }

  const results = db
    .select({
      topic: topics,
      progress: progress,
    })
    .from(topics)
    .leftJoin(progress, eq(topics.id, progress.topicId))
    .where(conditions)
    .orderBy(topics.pillarId, topics.order)
    .all()

  let filtered = results
  if (status) {
    filtered = results.filter(r => (r.progress?.status ?? 'not_started') === status)
  }

  return filtered.map(r => ({
    ...r.topic,
    status: r.progress?.status ?? 'not_started',
    confidence: r.progress?.confidence ?? 1,
    startedAt: r.progress?.startedAt ?? null,
    completedAt: r.progress?.completedAt ?? null,
    progressNotes: r.progress?.notes ?? null,
  }))
})
