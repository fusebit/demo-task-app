FROM node:14

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install

COPY webpack.config.js ./
COPY tsconfig.json ./
COPY public ./public
COPY src ./src
RUN npm run build

ENV SAMPLE_APP_TASK_JWT_SECRET=FUSEBIT_SECRET
EXPOSE 80
CMD ["npm", "start"]

