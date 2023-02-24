FROM node:18.14-alpine

RUN mkdir /app

ADD . /app

WORKDIR /app

RUN cd /app && npm install

RUN npm install pm2 -g

EXPOSE 8080

CMD ["pm2-runtime", "start", "pm2.config.js"]
