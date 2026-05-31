FROM node:lts-slim

# Necesitamos instalar herramientas de compilación para que sqlite3 pueda construirse en Linux
RUN apt-get update && apt-get install -y python3 make g++

WORKDIR /app

# Copiamos solo el package para aprovechar la caché
COPY package*.json ./

# Instalamos dentro del contenedor (aquí se compilará sqlite3 para Linux)
RUN npm install --build-from-source=sqlite3

# Copiamos el resto del código
COPY . .

CMD ["npm", "run", "dev"]