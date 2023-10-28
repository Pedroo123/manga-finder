# Author: Pedro Branks
FROM node:lts
WORKDIR usr/src/app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000

CMD ["node", "index.js"]