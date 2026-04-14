import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from './schema'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { resolve } from 'path'
import { existsSync, mkdirSync } from 'fs'

let _db: ReturnType<typeof drizzle<typeof schema>> | null = null

export function useDb() {
  if (_db) return _db

  const dbPath = process.env.DB_PATH || './data/roadmap.db'
  const dir = resolve(dbPath, '..')
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }

  const sqlite = new Database(dbPath)
  sqlite.pragma('journal_mode = WAL')
  sqlite.pragma('foreign_keys = ON')

  _db = drizzle(sqlite, { schema })

  const migrationsFolder = resolve(
    process.env.MIGRATIONS_PATH || './server/db/migrations'
  )
  if (existsSync(migrationsFolder)) {
    migrate(_db, { migrationsFolder })
  }

  return _db
}
