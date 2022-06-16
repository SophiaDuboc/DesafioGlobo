FROM node:16

RUN mkdir -p /opt/globo/DesafioGlobo/node_modules && chown -R node:node /opt/globo/DesafioGlobo

WORKDIR /opt/globo/DesafioGlobo

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

COPY --chown=node:node . .

USER node

EXPOSE 3000

COPY . .

CMD [ "npm", "start" ]
