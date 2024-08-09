FROM node:alpine
ARG APP_PATH=/app

RUN mkdir $APP_PATH /dist
WORKDIR $APP_PATH

COPY package.json $APP_PATH
COPY . $APP_PATH
RUN npm i -g pm2
RUN npm install

WORKDIR $APP_PATH
COPY . $APP_PATH

EXPOSE 3000

CMD ["pm2-runtime", "ecosystem.config.js"]
