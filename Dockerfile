FROM node

WORKDIR /usr/app

COPY package.json ./

COPY . .

RUN npm install --force

ENTRYPOINT [ "npm", "run", "dev" ]