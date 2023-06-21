FROM node:18.7.0

WORKDIR /aoo

COPY package*.json ./

RUN npm ci --only=production

COPY ./dist ./dist
COPY ./data ./data

EXPOSE 8081

CMD ["node", "./dist/server.js"]