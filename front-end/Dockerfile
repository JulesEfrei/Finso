FROM oven/bun:1 as build-stage
WORKDIR /app
COPY package.json bun.lockb .
RUN bun install --frozen-lockfile --production
COPY . .
RUN bun run build


FROM nginx:alpine-perl as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]