FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY src ./src
COPY tsconfig.json ./
RUN npm run build
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/index.js"]
