import { useDb } from '../../../db/client'
import { progress, topics } from '../../../db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const db = useDb()
  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody(event)

  if (!id || isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'Valid topic ID is required' })
  }

  const topic = db.select().from(topics).where(eq(topics.id, id)).get()
  if (!topic) {
    throw createError({ statusCode: 404, statusMessage: 'Topic not found' })
  }

  const existing = db.select().from(progress).where(eq(progress.topicId, id)).get()

  const now = new Date().toISOString()
  const updates: Record<string, unknown> = { updatedAt: now }

  if (body.status !== undefined) {
    updates.status = body.status
    if (body.status === 'in_progress' && !existing?.startedAt) {
      updates.startedAt = now
    }
    if (body.status === 'completed') {
      updates.completedAt = now
    }
    if (body.status === 'not_started') {
      updates.startedAt = null
      updates.completedAt = null
    }
  }

  if (body.confidence !== undefined) {
    updates.confidence = Number(body.confidence)
  }

  if (body.notes !== undefined) {
    updates.notes = body.notes
  }

  if (existing) {
    db.update(progress)
      .set(updates)
      .where(eq(progress.topicId, id))
      .run()
  } else {
    db.insert(progress).values({
      topicId: id,
      status: (body.status as 'not_started') ?? 'not_started',
      confidence: body.confidence ?? 1,
      notes: body.notes ?? null,
      startedAt: updates.startedAt as string | undefined ?? null,
      completedAt: updates.completedAt as string | undefined ?? null,
      updatedAt: now,
    }).run()
  }

  return db.select().from(progress).where(eq(progress.topicId, id)).get()
})
