FROM node:14

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install

COPY webpack.config.js ./
COPY tsconfig.json ./
COPY public ./public
COPY src ./src
RUN npm run build

ENV SAMPLE_APP_FALLBACK_SECRET=FUSEBIT_SECRE
ARG VH
ENV VERSION_HASH=$VH
EXPOSE 3000
CMD ["npm", "start"]

