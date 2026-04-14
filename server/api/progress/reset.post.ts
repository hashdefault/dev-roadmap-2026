import { useDb } from '../../db/client'
import { progress, logEntries } from '../../db/schema'
import { sql } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const db = useDb()
  const body = await readBody(event)

  if (body.confirm !== 'RESET') {
    throw createError({ statusCode: 400, statusMessage: 'Must confirm with "RESET"' })
  }

  db.update(progress).set({
    status: 'not_started',
    confidence: 1,
    startedAt: null,
    completedAt: null,
    notes: null,
    updatedAt: new Date().toISOString(),
  }).run()

  db.run(sql`DELETE FROM log_entries`)

  return { success: true, message: 'All progress has been reset' }
})
