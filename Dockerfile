FROM node:13.8.0-alpine3.11

ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
ENV PORT 80

WORKDIR /usr/src/app
COPY package.json .

RUN npm install

COPY . .

EXPOSE $PORT
CMD ["npm", "start"]