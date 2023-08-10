FROM node:16

WORKDIR /app

COPY package*.json ./
COPY yarn*.lock ./

COPY . .

RUN yarn install

EXPOSE 3001

CMD ["yarn", "start:app"]
