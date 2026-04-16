FROM node:22-slim AS builder

WORKDIR /app

# Debian packages (NOT apk)
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
 && rm -rf /var/lib/apt/lists/*

# Do NOT force musl on Debian
ENV npm_config_build_from_source=true

COPY package.json package-lock.json ./
RUN npm install

# Optional but safe for native module
RUN npm rebuild better-sqlite3 --build-from-source

COPY . .
RUN npm run build

# ---

FROM node:22-slim AS runtime

WORKDIR /app

# Runtime libs (Debian)
RUN apt-get update && apt-get install -y \
    libsqlite3-0 \
 && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/.output .output
COPY --from=builder /app/server/db/migrations server/db/migrations

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

RUN mkdir -p /app/data

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
