import { useDb } from '../../db/client'
import { logEntries } from '../../db/schema'
import { sql, gte } from 'drizzle-orm'

export default defineEventHandler(() => {
  const db = useDb()

  const now = new Date()
  const weekAgo = new Date(now)
  weekAgo.setDate(weekAgo.getDate() - 7)
  const monthAgo = new Date(now)
  monthAgo.setMonth(monthAgo.getMonth() - 1)

  const allTime = db
    .select({ total: sql<number>`COALESCE(SUM(${logEntries.durationMinutes}), 0)` })
    .from(logEntries)
    .get()

  const thisWeek = db
    .select({ total: sql<number>`COALESCE(SUM(${logEntries.durationMinutes}), 0)` })
    .from(logEntries)
    .where(gte(logEntries.date, weekAgo.toISOString().split('T')[0]))
    .get()

  const thisMonth = db
    .select({ total: sql<number>`COALESCE(SUM(${logEntries.durationMinutes}), 0)` })
    .from(logEntries)
    .where(gte(logEntries.date, monthAgo.toISOString().split('T')[0]))
    .get()

  // Daily breakdown for last 7 days
  const daily = db
    .select({
      date: logEntries.date,
      minutes: sql<number>`SUM(${logEntries.durationMinutes})`,
    })
    .from(logEntries)
    .where(gte(logEntries.date, weekAgo.toISOString().split('T')[0]))
    .groupBy(logEntries.date)
    .orderBy(logEntries.date)
    .all()

  return {
    allTimeMinutes: allTime?.total ?? 0,
    weekMinutes: thisWeek?.total ?? 0,
    monthMinutes: thisMonth?.total ?? 0,
    daily,
  }
})
