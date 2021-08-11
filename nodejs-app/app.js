'use strict'

var express = require( 'express');
//var bodyParser = require('body-parser');

var app = express();

// cargar archivos de rutas 
var project_routes = require('./routes/project')

// middlewares
//app.use(bodyParser.urlencoded({extended:false}));
app.use(express.urlencoded());
//app.use(bodyParser.json())
app.use(express.json()); //Used to parse JSON bodies


// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); //con el * estoy permitiendo todas las rutas a saco
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// rutas
app.use('/api', project_routes)


// exportar
module.exports = app;