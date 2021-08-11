'use strict'

var mongoose = require('mongoose');
var app = require('./app')
var port = 3700;


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://database:27017/portafolio')
    .then(() => {
        console.log("conexion establecida con exito");

        // creacion del servidor
        app.listen(port, () => {
            console.log(`Servidor corriendo correctamente en la url: localhost:${port}`)
        });
    })
    .catch(err => console.log(err));