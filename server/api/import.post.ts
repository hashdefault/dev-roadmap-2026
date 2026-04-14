import { useDb } from '../db/client'
import { pillars, topics, resources, progress, logEntries } from '../db/schema'
import { sql } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const db = useDb()
  const body = await readBody(event)

  if (!body.pillars || !body.topics) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid import data' })
  }

  // Clear all tables in order (respecting FK constraints)
  db.run(sql`DELETE FROM log_entries`)
  db.run(sql`DELETE FROM progress`)
  db.run(sql`DELETE FROM resources`)
  db.run(sql`DELETE FROM topics`)
  db.run(sql`DELETE FROM pillars`)

  // Re-insert all data
  for (const p of body.pillars) {
    db.insert(pillars).values(p).run()
  }
  for (const t of body.topics) {
    db.insert(topics).values(t).run()
  }
  if (body.resources) {
    for (const r of body.resources) {
      db.insert(resources).values(r).run()
    }
  }
  if (body.progress) {
    for (const p of body.progress) {
      db.insert(progress).values(p).run()
    }
  }
  if (body.logEntries) {
    for (const l of body.logEntries) {
      db.insert(logEntries).values(l).run()
    }
  }

  return { success: true, message: 'Data imported successfully' }
})
