FROM node:16-alpine AS builder

ARG name

WORKDIR /build

COPY ./package.json ./
COPY ./pnpm* ./
COPY ./api/${name}/ ./api/${name}/

RUN npm install -g pnpm
RUN pnpm install

WORKDIR /build/api/${name}

RUN pnpm run docker.build

# ###

# Must have same image as builder to ensure ...
# ... that the generated prisma client is ran ...
# ... in a similar environment to the one it was generated in.
FROM node:16-alpine AS runner

ARG name

ENV DATABASE_URL postgresql://postgres:postgres@db:5432/people
ENV NODE_ENV production
ENV PORT 3000

RUN npm install -g pnpm

WORKDIR /app

COPY --from=builder /build/package.json ./
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/api/${name}/package.json ./api/${name}/package.json
COPY --from=builder /build/api/${name}/node_modules/ ./api/${name}/node_modules/
COPY --from=builder /build/api/${name}/prisma/ ./api/${name}/prisma/
COPY --from=builder /build/api/${name}/dist/ ./api/${name}/dist/

WORKDIR /app/api/${name}

EXPOSE ${PORT}

CMD pnpm run docker.start
