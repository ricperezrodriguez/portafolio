'use strict'

const { render } = require('../app');
var Project = require('../models/projects');
const { param } = require('../routes/project');
var fs = require('fs');
var path = require('path');

var controller = {
    home: (req, res) => {
        return res.status(200).send({
            message: "soy el home"
        });
    },

    test: (req, res) => {
        return res.status(200).send({
            message: "soy el metodo o accion test del controlador de project"
        });
    },
    saveProject: (req, res) => {
        var project = new Project();
        var params = req.body;
        
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;
        console.log(project)

        project.save((err, projectStored) => {
            if(err) return res.status(500).send({message: "error al guradar el documento"});
            if (!projectStored) return res.stattus(404).send({message: "no de ha podido guradar el projecto"});
            return res.status(200).send({project: projectStored});
        });
    },
    getProject: (req, res) => {
        var projectId = req.params.id;

        if(projectId == null) return res.status(404).send({message: "no hay parametro"})

        Project.findById(projectId, (err, project) => {
            if(err) return res.status(500).send({message: "error al devolver los datos"});
            if(!project) return res.status(404).send({message: "el proyecto no existe"});
            return res.status(200).send({project});
        });
    },
    getProjects: (req, res) => {
        Project.find({}).sort('-year').exec((err, project) => {
            if(err) return res.status(500).send({message: "error al devolver los datos"});
            if(!project) return res.status(404).send({message: "no existe el proyecto"});
            return res.status(200).send({project});
        });
    },
    updateProject: (req, res) => {
        var projectId = req.params.id;
        var update = req.body;

        Project.findByIdAndUpdate(projectId, update, (err, projectUpdated) => {
            if(err) return res.status(500).send({message: "Error al actualizar"});
            if(!projectUpdated) return res.status(404).send({message: "no existe el proyecto para actualizar"});
            return res.status(200).send({proyecto: projectUpdated});
        });
    },
    deleteProject: (req, res) => {
        var projectId = req.params.id;

        Project.findByIdAndDelete(projectId, (err, projectRemoved) => {
            if(err) return res.status(500).send({message: "no se ha podido borrar el proyecto"});
            if(!projectRemoved) return res.status(404).send({message: "no de puede eliminar ese id"});
            return res.status(200).send({proyecto: projectRemoved});
        });
    },
    uploadImage: (req, res) => {
        var projectId = req.params.id;
        var fileName = "Imagen no subida...";

        if(req.files){
            var filePath = req.files.imagen.path;
            //var fileSplit = filePath.split('\\');
            var fileSplit = filePath.split('/');
            var fileName = fileSplit[1];
            
            Project.findByIdAndUpdate(projectId, {image: fileName}, (err, projectUpdated) => {
                if(err) return res.status(500).send({message: "la imagen no se ha cargado"});
                if(!projectUpdated) return res.status(404).send({message: "El proyecto no existe y no se ha asignado la imagen"});
                return res.status(200).send({project: projectUpdated});
            });
            
        }else{
            return res.status(500).send({message: fileName});
        }
    },
    getImage: (req, res) => {
        var file = req.params.im;
        console.log(file);
        var path_file = './uploads/'+file;
        fs.stat(path_file, (err, stats) => {
            console.log(path_file);
            if(stats){
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(200).send({message: "la imagen no existe chaval..."})
            }
        });
    }



};



module.exports = controller;