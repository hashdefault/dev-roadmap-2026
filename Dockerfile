FROM node:22-alpine AS builder

RUN apk add --no-cache python3 make g++ sqlite-dev libc6-compat

WORKDIR /app

ENV npm_config_build_from_source=true
ENV npm_config_target_libc=musl

COPY package.json package-lock.json ./
RUN npm install

RUN npm rebuild better-sqlite3 --build-from-source

COPY . .
RUN npm run build

# Rebuild again inside Nitro output
RUN cd .output/server && npm rebuild better-sqlite3 --build-from-source

# ---

FROM node:22-alpine AS runtime

RUN apk add --no-cache libc6-compat sqlite-libs

WORKDIR /app

COPY --from=builder /app/.output .output
COPY --from=builder /app/server/db/migrations server/db/migrations

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

RUN mkdir -p /app/data

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
