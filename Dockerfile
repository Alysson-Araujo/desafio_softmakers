FROM node:20

WORKDIR /server

COPY package*.json ./


COPY . .

COPY .env ./

RUN npm install

RUN npx prisma generate

RUN npx prisma migrate deploy

RUN npm run build

EXPOSE 3000


# Comando para iniciar a aplicação quando o contêiner for iniciado
CMD ["node", "dist/index.js"]