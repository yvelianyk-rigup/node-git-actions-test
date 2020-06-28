FROM node:12.16-alpine
RUN apk add --no-cache bash

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

ARG PORT=4000
EXPOSE $PORT
ENV PORT=$PORT

CMD npm run start
