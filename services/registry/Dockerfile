FROM node:8

WORKDIR /Users/heltonluis/docker-dir

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5002

CMD ["npm","start"]