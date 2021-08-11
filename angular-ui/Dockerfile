FROM node:14.17.3

WORKDIR /usr/src/app/app-ui

COPY package*.json ./

RUN npm install -g @angular/cli && npm install

COPY . .

EXPOSE 4200

#CMD [ "ng", "start" ]