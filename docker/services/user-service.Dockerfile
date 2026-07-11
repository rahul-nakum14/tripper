FROM node:22-alpine AS user-service-builder
WORKDIR /app
COPY . .
WORKDIR /app/services/user-service
RUN npm install && npm run build

FROM node:22-alpine AS user-service-runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=user-service-builder /app/node_modules ./node_modules
COPY --from=user-service-builder /app/services/user-service/dist ./dist
COPY --from=user-service-builder /app/services/user-service/package.json ./package.json
EXPOSE 50051
CMD ["node", "dist/main"]