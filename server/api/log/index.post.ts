import { useDb } from '../../db/client'
import { logEntries } from '../../db/schema'

export default defineEventHandler(async (event) => {
  const db = useDb()
  const body = await readBody(event)

  if (!body.date || !body.durationMinutes) {
    throw createError({ statusCode: 400, statusMessage: 'date and durationMinutes are required' })
  }

  const entry = db.insert(logEntries).values({
    topicId: body.topicId ?? null,
    date: body.date,
    durationMinutes: Number(body.durationMinutes),
    summary: body.summary ?? null,
    createdAt: new Date().toISOString(),
  }).returning().all()

  return entry[0]
})
