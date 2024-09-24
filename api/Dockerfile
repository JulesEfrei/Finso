FROM oven/bun:1 AS base
WORKDIR /usr/src/app


FROM base AS install
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile


FROM base AS prerelease
COPY --from=install /temp/prod/node_modules node_modules
COPY . .
RUN bun run build
RUN bun build src/utils/migrate.ts src/utils/dataFixture.ts --outdir ./dist/db --target bun


FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/dist/ .
COPY --from=prerelease /usr/src/app/drizzle ./drizzle
COPY --from=prerelease /usr/src/app/setup.sh .
COPY --from=prerelease /usr/src/app/package.json .

USER bun
EXPOSE 3000/tcp
CMD [ "bun", "run", "index.js" ]

FROM base as dev
ADD . .
RUN bun install
USER bun
EXPOSE 3000/tcp
CMD ["bun", "run", "dev"]