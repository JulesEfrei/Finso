FROM oven/bun:1 as build-stage
WORKDIR /app
ARG VITE_BASE_URL
ENV VITE_BASE_URL=$VITE_BASE_URL

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build


FROM nginx:alpine-perl as release
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


FROM build-stage as dev
ARG VITE_BASE_URL
ENV VITE_BASE_URL=$VITE_BASE_URL
ADD . .
USER bun
EXPOSE 5173/tcp
CMD ["bun", "run", "dev"]