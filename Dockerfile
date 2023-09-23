FROM node:bookworm
WORKDIR /build

COPY ./package*.json ./
RUN npm ci
COPY . .
RUN NEXT_TELEMETRY_DISABLED=0 npm run build
