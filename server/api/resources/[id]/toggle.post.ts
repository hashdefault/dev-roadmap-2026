import { useDb } from '../../../db/client'
import { resources } from '../../../db/schema'
import { eq, not } from 'drizzle-orm'

export default defineEventHandler((event) => {
  const db = useDb()
  const id = Number(getRouterParam(event, 'id'))

  if (!id || isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'Valid resource ID is required' })
  }

  const resource = db.select().from(resources).where(eq(resources.id, id)).get()
  if (!resource) {
    throw createError({ statusCode: 404, statusMessage: 'Resource not found' })
  }

  db.update(resources)
    .set({ consumed: !resource.consumed })
    .where(eq(resources.id, id))
    .run()

  return db.select().from(resources).where(eq(resources.id, id)).get()
})
