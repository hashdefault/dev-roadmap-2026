FROM node:22-alpine AS builder

RUN apk add --no-cache python3 make g++ sqlite-dev libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --build-from-source=better-sqlite3 

COPY . .
RUN npm run build

# ---

FROM node:22-alpine AS runtime

WORKDIR /app

COPY --from=builder /app/.output .output
COPY --from=builder /app/server/db/migrations server/db/migrations

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
ENV DB_PATH=/app/data/roadmap.db
ENV MIGRATIONS_PATH=/app/server/db/migrations
ENV npm_config_build_from_source=true

RUN mkdir -p /app/data

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://localhost:3000/api/health').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"

CMD ["node", ".output/server/index.mjs"]
