FROM node:22-slim AS runtime

WORKDIR /app

RUN apt-get update && apt-get install -y \
    sqlite3 \
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
