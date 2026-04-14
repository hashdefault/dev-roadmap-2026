import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core'

export const pillars = sqliteTable('pillars', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  description: text('description'),
  order: integer('order').notNull().default(0),
  color: text('color').notNull(),
})

export const topics = sqliteTable('topics', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  pillarId: integer('pillar_id').notNull().references(() => pillars.id, { onDelete: 'cascade' }),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  description: text('description'),
  depth: text('depth', { enum: ['broad', 'deep', 'optional'] }).notNull().default('broad'),
  estimatedHours: real('estimated_hours'),
  order: integer('order').notNull().default(0),
  priority: integer('priority').notNull().default(3),
})

export const resources = sqliteTable('resources', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  topicId: integer('topic_id').notNull().references(() => topics.id, { onDelete: 'cascade' }),
  type: text('type', { enum: ['book', 'course', 'article', 'video', 'project', 'docs', 'paper'] }).notNull(),
  title: text('title').notNull(),
  url: text('url'),
  author: text('author'),
  notes: text('notes'),
  order: integer('order').notNull().default(0),
  consumed: integer('consumed', { mode: 'boolean' }).notNull().default(false),
})

export const progress = sqliteTable('progress', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  topicId: integer('topic_id').notNull().references(() => topics.id, { onDelete: 'cascade' }).unique(),
  status: text('status', { enum: ['not_started', 'in_progress', 'completed', 'revisiting'] }).notNull().default('not_started'),
  startedAt: text('started_at'),
  completedAt: text('completed_at'),
  confidence: integer('confidence').notNull().default(1),
  notes: text('notes'),
  updatedAt: text('updated_at').notNull().$defaultFn(() => new Date().toISOString()),
})

export const logEntries = sqliteTable('log_entries', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  topicId: integer('topic_id').references(() => topics.id, { onDelete: 'set null' }),
  date: text('date').notNull(),
  durationMinutes: integer('duration_minutes').notNull(),
  summary: text('summary'),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
})

export type Pillar = typeof pillars.$inferSelect
export type Topic = typeof topics.$inferSelect
export type Resource = typeof resources.$inferSelect
export type Progress = typeof progress.$inferSelect
export type LogEntry = typeof logEntries.$inferSelect
