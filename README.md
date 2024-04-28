# API con Node.js, Nodemon, Express + Base de datos MongoDB sobre Clima

Esta es una API simple construida con Node.js y Express, que utiliza MongoDB como base de datos con Mongoose para interactuar con ella.

La base de datos adjunta trata elementos sobre el clima

Este proyecto ha sido realizado para la asignatura de Complementos de Bases de Datos del plan de estudios de Ingeniería del Software de la Universidad de Sevilla y ha sido realizado por David Cortabarra Romero y Alejandro Campano Galán

## Requisitos previos

Asegúrate de tener instalados los siguientes programas en tu sistema:

- [Node.js](http://nodejs.org)
- [MongoDB](https://www.mongodb.com/try/download/community-kubernetes-operator)
- MongoRestore: 
      1. Descarga el [zip](https://fastdl.mongodb.org/tools/db/mongodb-database-tools-windows-x86_64-100.9.4.zip)
      2.Añáde la carpeta bine al PATH de tus variables de entorno

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/Alejandrocg024/cbd-clima.git
   ```

2. Entra al directorio del proyecto:

   ```bash
   cd API
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

## Configuración
1. Asegúrate de tener MongoDB en ejecución en tu sistema local.

2. Entra al directorio de la base de datos

   ```bash
   cd mongodb
   ```

3. Inicializa la base de datos

   ```bash
   mongorestore --db climate ./climate
   ```

## Uso

Para iniciar el servidor, ejecuta el siguiente comando:

```bash
npm run dev
```

Para probar todos los endpoints en postman, puede importar el .json que hay en la carpeta postman en la aplicación como una colección. Puede ir ejecutandolos en orden y probando todo (para probar el delete puede copiar el id que ha creado justo antes en el post)