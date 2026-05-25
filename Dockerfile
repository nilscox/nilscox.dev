FROM node:26-slim AS build

RUN apt update
RUN apt install --yes chromium

RUN npm install -g pnpm
WORKDIR /app
RUN chown 1000:1000 /app
USER 1000:1000

COPY . /app

RUN pnpm install --frozen-lockfile
RUN pnpm build
RUN pnpm generate-pdf

FROM nginx:latest

COPY --from=build /app/dist /usr/share/nginx/html

