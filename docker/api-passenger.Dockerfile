FROM node:16-alpine AS builder

WORKDIR /build

COPY ./package.json ./
COPY ./pnpm* ./
COPY ./api/passenger/ ./api/passenger/

RUN npm install -g pnpm
RUN pnpm install

WORKDIR /build/api/passenger

RUN pnpm run db.generate
RUN pnpm run build
RUN pnpm run prune --prod
RUN cd api/passenger && pnpm prune --prod

# ###

# Must have same image as builder to ensure ...
# ... that the generated prisma client is ran ...
# ... in a similar environment to the one it was generated in.
FROM node:16-alpine AS runner

ENV DATABASE_URL postgresql://postgres:postgres@db:5432/people
ENV NODE_ENV production
ENV PORT 3000

RUN npm install -g pnpm

WORKDIR /app

COPY --from=builder /build/package.json ./
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/api/passenger/package.json ./api/passenger/package.json
COPY --from=builder /build/api/passenger/node_modules/ ./api/passenger/node_modules/
COPY --from=builder /build/api/passenger/prisma/ ./api/passenger/prisma/
COPY --from=builder /build/api/passenger/dist/ ./api/passenger/dist/

WORKDIR /app/api/passenger

EXPOSE ${PORT}

CMD pnpm run start.deploy
