# Claude Code Prompt: Dev Roadmap 2026

Copy everything below this line and paste into Claude Code at the root of an empty directory.

---

## Project: `dev-roadmap-2026`

Build me a self-hosted, interactive learning roadmap web app to track my progress as a developer through a curated 2026 curriculum. This is a **single-user personal tool** that will run in Docker on my homelab. Prioritize clean architecture, readable code, and a distinctive UI over feature bloat.

### Stack (non-negotiable)

- **Nuxt 3** (Vue 3 + Composition API, `<script setup>`, TypeScript)
- **Tailwind CSS** for styling + **CSS Modules** for component-scoped custom styles when Tailwind gets ugly
- **SQLite** via `better-sqlite3` (file-based, mounted as a Docker volume at `/app/data/roadmap.db`)
- **Drizzle ORM** for type-safe queries and migrations
- **Pinia** for client state
- **Docker + docker-compose** for deployment
- Zero external auth — this is localhost/Tailscale only
- No CDN dependencies at runtime — everything bundled

### Visual direction

Terminal/hacker aesthetic, but readable. Gruvbox dark palette as the base (I like it — use the official hex values). Monospace for code/labels (JetBrains Mono), a clean sans (Inter) for body copy. Vim-style keyboard navigation where it makes sense (`j`/`k` to move between topics, `x` to toggle complete, `/` to search). Should feel like a tool, not a SaaS product. Subtle, no gradients, no glassmorphism, no emojis in the UI.

### Data model

Four core entities:

1. **Pillar** — the top-level categories (e.g. "Mental Model", "Core Knowledge", "AI-Era Tooling", "Gear", "Meta-Skills"). Has `id`, `slug`, `title`, `description`, `order`, `color` (hex).

2. **Topic** — a learning item inside a pillar (e.g. "SQL fluency", "Rust fundamentals", "Distributed systems"). Has `id`, `pillar_id`, `slug`, `title`, `description` (markdown), `depth` (enum: `broad` | `deep` | `optional`), `estimated_hours`, `order`, `priority` (1-5).

3. **Resource** — a concrete thing to read/watch/do attached to a topic. Has `id`, `topic_id`, `type` (enum: `book` | `course` | `article` | `video` | `project` | `docs` | `paper`), `title`, `url`, `author`, `notes` (markdown), `order`.

4. **Progress** — tracks my state per topic. Has `id`, `topic_id`, `status` (enum: `not_started` | `in_progress` | `completed` | `revisiting`), `started_at`, `completed_at`, `confidence` (1-5, self-rated), `notes` (markdown, my own takeaways), `updated_at`.

5. **LogEntry** — an append-only journal of study sessions. Has `id`, `topic_id` (nullable), `date`, `duration_minutes`, `summary` (markdown), `created_at`. This is the "what did I actually do today" log.

### Seed data

Pre-populate the DB with the following curriculum on first boot (only if empty). Use this structure exactly — treat the content as the initial roadmap, not a suggestion:

**Pillar 1 — Mental Model** (`#fabd2f` yellow)
- Systems thinking (deep) — understand the path from keypress to pixel
- Reading code as a first-class skill (broad)
- Hypothesis-driven debugging (broad)
- Taste in abstractions (deep)

**Pillar 2 — Core Knowledge: Broad Layer** (`#83a598` blue)
- One systems language: Rust or Go (broad, priority 5)
- One scripting language: Python or TypeScript (broad, priority 5)
- SQL fluency beyond ORMs — indexes, query plans, denormalization (broad, priority 5)
- HTTP, DNS, TLS fundamentals (broad, priority 4)
- Linux shell + a fast editor: neovim/helix (broad, priority 5)
- Git beyond add/commit/push — rebase, bisect, reflog (broad, priority 4)
- Docker + compose deeply (broad, priority 5)

**Pillar 3 — Core Knowledge: Deep Layer** (`#b8bb26` green)
- Distributed systems: consensus, CAP, eventual consistency (deep, priority 4)
- Database internals: B-trees, LSM trees, MVCC (deep, priority 5)
- AI engineering: deployment, evaluation, RAG, prompt pipelines (deep, priority 5)
- Compilers and language design (optional)
- Security: threat modeling, crypto fundamentals (deep, priority 3)
- Performance engineering: profiling, cache hierarchies (deep, priority 3)

**Pillar 4 — AI-Era Tooling** (`#d3869b` purple)
- Agentic coding workflow (Claude Code, Cursor, Zed) (broad, priority 5)
- Local model inference via Ollama / llama.cpp (broad, priority 3)
- Evals-first development for LLM features (deep, priority 5)
- Prompt architecture and context engineering (broad, priority 4)

**Pillar 5 — Gear & Environment** (`#fe8019` orange)
- Ergonomic keyboard mastery (optional, priority 2)
- Dual-monitor / ultrawide workflow (optional, priority 2)
- Homelab as a practice environment (broad, priority 3)
- Dev machine sized for local LLMs (32GB+ RAM) (optional, priority 2)

**Pillar 6 — Meta-Skills** (`#8ec07c` aqua)
- Technical writing: READMEs, design docs, post-mortems (broad, priority 5)
- Reading source code of tools you use (broad, priority 4)
- One long-horizon hobby outside code (broad, priority 3)
- Async communication for remote work (broad, priority 4)

Pre-seed 2–4 concrete resources per topic where obvious (e.g. *How Linux Works* for Systems thinking, *Designing Data-Intensive Applications* for Distributed systems, *Crafting Interpreters* for Compilers, the Rustlings repo for Rust, etc.). Don't invent URLs — only include ones you're confident are real, and mark the others as `url: null` so I can fill them in.

### Pages & features

1. **`/` — Dashboard**
   - Overall progress ring (% topics completed, weighted by priority)
   - Progress bar per pillar
   - "Current focus" — topics in `in_progress` state
   - "Next up" — suggested topics based on priority, filtered by what's not started
   - Last 7 days of log entries (sparkline of minutes studied)

2. **`/roadmap` — The full map**
   - All pillars as columns or collapsible sections
   - Each topic shown as a card with status color, priority dots, estimated hours
   - Filters: by pillar, by depth, by status, by priority
   - Keyboard nav: j/k to move, enter to open, x to toggle complete

3. **`/topic/[slug]` — Topic detail**
   - Full description rendered from markdown
   - List of resources with type icons, check off as consumed
   - My notes (markdown editor, autosaves)
   - Status controls + confidence slider
   - Related log entries

4. **`/log` — Study journal**
   - Add entry (date, duration, optional topic link, markdown summary)
   - Filterable by topic, date range
   - Total hours per week / month / all-time
   - Heatmap calendar like GitHub contributions, but gruvbox

5. **`/settings`**
   - Export DB to JSON
   - Import from JSON
   - Reset progress (confirm twice)

### Server routes (Nuxt `server/api/`)

RESTful, one resource per file. Examples:
- `GET /api/pillars`
- `GET /api/topics?pillar=x&status=y`
- `PATCH /api/topics/[id]/progress`
- `POST /api/resources/[id]/toggle`
- `GET /api/log?from=&to=`
- `POST /api/log`
- `GET /api/export`
- `POST /api/import`

### Project structure

```
dev-roadmap-2026/
  app/
    assets/css/
    components/
      ui/              # buttons, inputs, cards
      roadmap/         # PillarColumn, TopicCard, ProgressRing
      log/             # LogEntry, Heatmap
    composables/
      useTopics.ts
      useLog.ts
      useKeyboardNav.ts
    pages/
    stores/
  server/
    api/
    db/
      schema.ts        # Drizzle schema
      migrations/
      seed.ts
      client.ts
  data/                # mounted volume, contains roadmap.db
  Dockerfile
  docker-compose.yml
  nuxt.config.ts
  tailwind.config.ts
  package.json
  README.md
```

### Docker

- Multi-stage Dockerfile: build stage with full deps, runtime stage with only `.output/` and `node_modules/` pruned to production
- `docker-compose.yml` exposes port 3000 by default, mounts `./data` as volume, sets `NODE_ENV=production`
- Include a `docker-compose.dev.yml` override for local dev with hot reload
- Healthcheck hitting `/api/health`

### Deliverables

1. Complete working project, `docker compose up` brings it live at `localhost:3000` with seeded DB on first run
2. `README.md` with: what it is, quickstart (3 commands max to running), data model diagram, keyboard shortcuts table, backup/restore instructions
3. All migrations committed, seed script idempotent (safe to re-run)
4. TypeScript strict mode, no `any` unless justified with a comment
5. At least one composable per major domain (topics, log, progress) — not logic-in-components

### Out of scope (do not build)

- Multi-user, auth, accounts
- External integrations (GitHub, Anki, etc.) — can come later
- Mobile-specific layout — desktop-first is fine, just don't break on narrow viewports
- Notifications, email, webhooks
- Dark/light toggle — it's dark, that's it

### Process

Build it in this order and commit after each step:
1. Scaffold Nuxt + Tailwind + TS + Drizzle + better-sqlite3
2. Schema + migrations + seed
3. Server API routes with basic validation
4. Roadmap page (the core view) with keyboard nav
5. Topic detail page with markdown rendering + notes editor
6. Dashboard
7. Log + heatmap
8. Settings (export/import)
9. Dockerfile + compose + README
10. Polish pass: empty states, loading states, error boundaries

If you hit an ambiguous decision, pick the simpler option and note it in the README under a "Design choices" section. Don't ask me mid-build — just make it and tell me after.

Start by confirming the stack and showing me the `package.json` and `nuxt.config.ts` before writing anything else.
