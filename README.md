# Dev Roadmap 2026

A self-hosted, interactive learning roadmap to track developer progress through a curated 2026 curriculum. Built for single-user use on a homelab.

## Quickstart

```bash
git clone <repo-url> && cd dev-roadmap-2026
docker compose up -d
# Open http://localhost:3000
```

The database is seeded automatically on first boot.

## Local development

```bash
npm install
npm run dev
# Open http://localhost:3000
```

Or with Docker:

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up
```

## Stack

- **Nuxt 3** (Vue 3, Composition API, TypeScript strict)
- **Tailwind CSS** with Gruvbox dark palette
- **SQLite** via better-sqlite3
- **Drizzle ORM** for type-safe queries and migrations
- **Pinia** for client state
- **Docker** for deployment

## Data model

```
Pillar (6)
  |-- Topic (27)
  |     |-- Resource (multiple per topic)
  |     |-- Progress (1:1 per topic)
  |
LogEntry (standalone journal, optionally linked to topic)
```

- **Pillar** -- top-level category (Mental Model, Core Knowledge, AI-Era Tooling, etc.)
- **Topic** -- a specific learning item with priority (1-5), depth (broad/deep/optional), estimated hours
- **Resource** -- book, course, article, video, project, docs, or paper attached to a topic
- **Progress** -- status (not_started/in_progress/completed/revisiting), confidence (1-5), notes
- **LogEntry** -- append-only study session log with date, duration, summary

## Pages

| Route | Description |
|-------|-------------|
| `/` | Dashboard with progress ring, pillar bars, current focus, next up, sparkline |
| `/roadmap` | Full roadmap with all pillars and topics, filterable, keyboard navigable |
| `/topic/:slug` | Topic detail with resources, markdown notes editor, status/confidence controls |
| `/log` | Study journal with add entry, filters, hour totals, GitHub-style heatmap |
| `/settings` | Export/import JSON, reset progress |

## Keyboard shortcuts

| Key | Action |
|-----|--------|
| `j` | Move down to next topic |
| `k` | Move up to previous topic |
| `Enter` | Open selected topic |
| `x` | Toggle selected topic complete/not started |
| `/` | Focus search |
| `g` | Jump to first topic |
| `G` | Jump to last topic |
| `Escape` | Exit search/text input |

## API routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/pillars` | All pillars with topic counts |
| GET | `/api/topics?pillar=&status=&depth=` | Filtered topics with progress |
| GET | `/api/topics/:slug` | Topic detail with resources and logs |
| PATCH | `/api/topics/:id/progress` | Update topic progress/status/confidence/notes |
| POST | `/api/resources/:id/toggle` | Toggle resource consumed state |
| GET | `/api/log?from=&to=&topic=` | Filtered log entries |
| POST | `/api/log` | Add log entry |
| GET | `/api/log/stats` | Week/month/all-time totals |
| GET | `/api/log/heatmap` | Daily activity for heatmap (last year) |
| GET | `/api/dashboard` | Dashboard aggregate data |
| GET | `/api/export` | Export all data as JSON |
| POST | `/api/import` | Import data from JSON (replaces existing) |
| POST | `/api/progress/reset` | Reset all progress (requires `{ confirm: "RESET" }`) |

## Backup and restore

**Backup** -- either copy `./data/roadmap.db` directly, or use the export feature:
```bash
curl http://localhost:3000/api/export > backup.json
```

**Restore** -- import the JSON backup:
```bash
curl -X POST http://localhost:3000/api/import \
  -H "Content-Type: application/json" \
  -d @backup.json
```

Or replace `./data/roadmap.db` with a backup copy (stop the container first).

## Design choices

- **No auth** -- designed for localhost/Tailscale, single-user only.
- **SQLite + file volume** -- simplest possible persistence; just back up one file.
- **Server-side seed on first boot** -- Nitro plugin checks if DB is empty and seeds. Idempotent.
- **Weighted progress** -- overall % is weighted by topic priority, so high-priority topics count more.
- **Markdown everywhere** -- topic descriptions, notes, and log summaries all support markdown.
- **No dark/light toggle** -- Gruvbox dark, always.
- **Fonts bundled** -- JetBrains Mono and Inter served from `/fonts/`, no CDN.
- **Keyboard nav uses vim conventions** -- `j`/`k` only active when not in a text input.
