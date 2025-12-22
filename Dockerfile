# Build Stage
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production Stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY entrypoint.sh /docker-entrypoint.d/99-env-subst.sh
RUN chmod +x /docker-entrypoint.d/99-env-subst.sh

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
