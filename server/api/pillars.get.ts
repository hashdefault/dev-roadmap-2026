import { useDb } from '../db/client'
import { pillars, topics, progress } from '../db/schema'
import { eq, count, sql } from 'drizzle-orm'

export default defineEventHandler(() => {
  const db = useDb()

  const allPillars = db.select().from(pillars).orderBy(pillars.order).all()

  return allPillars.map(pillar => {
    const topicCount = db
      .select({ value: count() })
      .from(topics)
      .where(eq(topics.pillarId, pillar.id))
      .get()

    const completedCount = db
      .select({ value: count() })
      .from(topics)
      .innerJoin(progress, eq(topics.id, progress.topicId))
      .where(sql`${topics.pillarId} = ${pillar.id} AND ${progress.status} = 'completed'`)
      .get()

    return {
      ...pillar,
      topicCount: topicCount?.value ?? 0,
      completedCount: completedCount?.value ?? 0,
    }
  })
})
