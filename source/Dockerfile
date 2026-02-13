# syntax=docker/dockerfile:1
FROM node:18

WORKDIR /app

# Copiar package.json y yarn.lock primero para cachear dependencias
COPY package.json yarn.lock ./

# Copiar todos los packages manteniendo estructura
COPY packages/ ./packages/

# Instalar dependencias (esto también ejecuta postinstall -> build)
RUN yarn install --frozen-lockfile

# Instalar nest cli globalmente
RUN npm install -g @nestjs/cli

WORKDIR /app/packages/did-method-modena-api

EXPOSE 3000

CMD ["nest", "start"]
