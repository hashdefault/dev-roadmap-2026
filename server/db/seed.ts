import { useDb } from './client'
import { pillars, topics, resources, progress } from './schema'
import { count } from 'drizzle-orm'
import seedData from './seed-data'

async function seed() {
  const db = useDb()

  const existing = db.select({ value: count() }).from(pillars).get()
  if (existing && existing.value > 0) {
    console.log('Database already seeded, skipping.')
    return
  }

  console.log('Seeding database...')

  for (let pi = 0; pi < seedData.length; pi++) {
    const p = seedData[pi]
    const pillarRows = db.insert(pillars).values({
      slug: p.slug,
      title: p.title,
      titlePt: p.titlePt,
      description: p.description,
      descriptionPt: p.descriptionPt,
      order: pi + 1,
      color: p.color,
    }).returning().all()
    const pillar = pillarRows[0]

    for (let ti = 0; ti < p.topics.length; ti++) {
      const t = p.topics[ti]
      const topicRows = db.insert(topics).values({
        pillarId: pillar.id,
        slug: t.slug,
        title: t.title,
        titlePt: t.titlePt,
        description: t.description,
        descriptionPt: t.descriptionPt,
        depth: t.depth,
        estimatedHours: t.estimatedHours,
        order: ti + 1,
        priority: t.priority,
      }).returning().all()
      const topic = topicRows[0]

      // Create initial progress record
      db.insert(progress).values({
        topicId: topic.id,
        status: 'not_started',
        confidence: 1,
        updatedAt: new Date().toISOString(),
      }).run()

      for (let ri = 0; ri < t.resources.length; ri++) {
        const r = t.resources[ri]
        db.insert(resources).values({
          topicId: topic.id,
          type: r.type,
          title: r.title,
          url: r.url,
          author: r.author,
          order: ri + 1,
        }).run()
      }
    }
  }

  console.log('Seeding complete.')
}

seed().catch(console.error)
