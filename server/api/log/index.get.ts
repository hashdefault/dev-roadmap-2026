import { useDb } from '../../db/client'
import { logEntries, topics } from '../../db/schema'
import { eq, and, gte, lte, desc, sql } from 'drizzle-orm'

export default defineEventHandler((event) => {
  const db = useDb()
  const query = getQuery(event)

  const from = query.from as string | undefined
  const to = query.to as string | undefined
  const topicId = query.topic ? Number(query.topic) : undefined

  let conditions = sql`1=1`

  if (from) {
    conditions = sql`${conditions} AND ${logEntries.date} >= ${from}`
  }
  if (to) {
    conditions = sql`${conditions} AND ${logEntries.date} <= ${to}`
  }
  if (topicId) {
    conditions = sql`${conditions} AND ${logEntries.topicId} = ${topicId}`
  }

  const entries = db
    .select({
      entry: logEntries,
      topicTitle: topics.title,
      topicTitlePt: topics.titlePt,
      topicSlug: topics.slug,
    })
    .from(logEntries)
    .leftJoin(topics, eq(logEntries.topicId, topics.id))
    .where(conditions)
    .orderBy(desc(logEntries.date), desc(logEntries.createdAt))
    .all()

  return entries.map(e => ({
    ...e.entry,
    topicTitle: e.topicTitle,
    topicTitlePt: e.topicTitlePt,
    topicSlug: e.topicSlug,
  }))
})
