## Backend Application

Se trata de un backend realizado en Nodejs + express

El punto de entrada para el usuario está disponible en: **http://localhost:3700/api/**

Las rutas disponibles son:
- /home             GET
- /test             POST
- /save-project     POST
- /project/:id?     GET
- /projects         GET
- /project/:id      PUT
- /project/:id      DELETE
- /upload-image/:id POST
- /get-image/:im    GET




---

### Base de datos

Se conecta a una base de datos de MongoDB a traves del puerto 27017
Se utiliza la imagen de DockerHub *mongo* y se comparten los datos de la base de datos con el 
volumen: *miportafolio-data*
Actualmente sin usuario ni contraseña




---

Actualmente está en modo desarrollo ejecutandose el script *dev* ejecutando la herramienta *nodemon*:
```
nodemon index.js
```