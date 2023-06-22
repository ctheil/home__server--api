FROM node:18.7.0

ENV GOVEE_API_KEY="c778f145-07cd-4ea6-b519-c1e06df6ba6e"

WORKDIR /aoo

COPY package*.json ./

RUN npm ci --only=production

COPY ./dist ./dist
COPY ./data ./data

EXPOSE 8081

CMD ["node", "./dist/server.js"]