
FROM sci-alpine-nodejs

ENV APP_PATH /usr/src/app

RUN mkdir -p $APP_PATH

COPY package.json $APP_PATH
COPY yarn.lock $APP_PATH


WORKDIR $APP_PATH
RUN apk add --no-cache make gcc g++ python git bash && \
  npm install -g yarn && \
  yarn install && \
  touch .env && \
  npm uninstall -g yarn && \
  apk del make gcc g++ python git

COPY . $APP_PATH

EXPOSE 3000

CMD ["npm", "run", "start"]