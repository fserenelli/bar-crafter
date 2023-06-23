# Utiliza la imagen de Node.js como base
FROM node:latest

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del proyecto a la carpeta de trabajo
COPY . /app

# Instala las dependencias del proyecto
RUN npm install

# Define el comando de inicio de la aplicación
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]


# -------------------------------------------------------------------------------


### ANOTACION PARA LEVANTAR UN AMBIENTE LIMPIO CON NODE ###

## Crear el .yml, y levantarlo con ´docker compose up' para luego
## acceder al contenedor e instalar cualquier app

#version: "3"
#services:
#  node:
#    container_name: bar-crafter-node
#    image: node:latest
#    volumes:
#      - ./react-app:/app
#    working_dir: /app
#    stdin_open: true
#    tty: true
#    ports:
#      - "5173:5173"