FROM node:14

ENV JWT_SECRET=FUSEBIT_SECRET:TODO

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install

COPY webpack.config.js ./
COPY tsconfig.json ./
COPY public ./public
COPY src ./src
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]

