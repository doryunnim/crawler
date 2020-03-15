FROM node:13
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN chmod +x docker-entrypoint.sh  
ENTRYPOINT ./docker-entrypoint.sh

COPY . .
EXPOSE 3000