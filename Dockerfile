FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV port=3001

EXPOSE 3001

CMD [ "node", "server/main.js" ]
