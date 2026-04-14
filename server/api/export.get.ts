import { useDb } from '../db/client'
import { pillars, topics, resources, progress, logEntries } from '../db/schema'

export default defineEventHandler(() => {
  const db = useDb()

  return {
    exportedAt: new Date().toISOString(),
    pillars: db.select().from(pillars).all(),
    topics: db.select().from(topics).all(),
    resources: db.select().from(resources).all(),
    progress: db.select().from(progress).all(),
    logEntries: db.select().from(logEntries).all(),
  }
})
