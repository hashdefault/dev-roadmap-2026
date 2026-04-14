import { useDb } from '../../db/client'
import { logEntries } from '../../db/schema'
import { sql, gte } from 'drizzle-orm'

export default defineEventHandler(() => {
  const db = useDb()

  // Last 365 days
  const yearAgo = new Date()
  yearAgo.setFullYear(yearAgo.getFullYear() - 1)

  const daily = db
    .select({
      date: logEntries.date,
      minutes: sql<number>`SUM(${logEntries.durationMinutes})`,
      count: sql<number>`COUNT(*)`,
    })
    .from(logEntries)
    .where(gte(logEntries.date, yearAgo.toISOString().split('T')[0]))
    .groupBy(logEntries.date)
    .orderBy(logEntries.date)
    .all()

  return daily
})
