FROM node:6.11.4
MAINTAINER hdhuang <kaungmsn@gmail.com>
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
WORKDIR /usr/src/app
ADD . /usr/src/app
RUN cnpm install
RUN cnpm install pm2 -g
RUN npm run build
EXPOSE 8082
CMD [ "pm2-docker", "server.js" ]
