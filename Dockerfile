FROM node:14

WORKDIR /usr/src/app

COPY package-lock.json ./
COPY package.json ./

COPY webpack.config.js ./
COPY tsconfig.json ./
COPY public ./public
COPY src ./src

RUN npm install
RUN npm run build

ARG VH
ARG INTEGRATIONS_FEED_URL

ENV VERSION_HASH=$VH
ENV INTEGRATIONS_FEED_URL=$INTEGRATIONS_FEED_URL

EXPOSE 3000
CMD ["npm", "start"]

