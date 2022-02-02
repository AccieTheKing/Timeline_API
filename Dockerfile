FROM node:14-alpine

RUN mkdir -p /app/src
WORKDIR /app/src

COPY package.json yarn.lock /app/src/

RUN yarn install

COPY . .

EXPOSE 5000

CMD [ "yarn", "start:dev" ]
