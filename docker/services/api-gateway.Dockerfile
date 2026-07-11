FROM node:22-alpine AS api-gateway-builder
WORKDIR /app
COPY . .
WORKDIR /app/services/api-gateway
RUN npm install && npm run build

FROM node:22-alpine AS api-gateway-runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=api-gateway-builder /app/node_modules ./node_modules
COPY --from=api-gateway-builder /app/services/api-gateway/dist ./dist
COPY --from=api-gateway-builder /app/services/api-gateway/package.json ./package.json
EXPOSE 3000
CMD ["node", "dist/main"]