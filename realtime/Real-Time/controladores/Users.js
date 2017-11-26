'use strict'
var connection = require('../modelos/db.js');
///// Código a utilizar cuando se se realizan las solicitudes get o post
module.exports = {
    NewUser: (req, res, next) => {
        var usuarios = [{nombre:"Raguinho"}];
        usuarios.push({nombre:"Nando"})
        connection.connect();
        connection.query('SELECT * FROM usuarios', function (error, resultados, fields) {
            if (error) throw error;
            for(var i = 0; i<resultados.length;i++){
            //No está funcionando el push
                usuarios.push(resultados[i])
            }           
        });
        res.render('index', {
            title:'Express',
            usuarios:usuarios
        });       
        console.log(usuarios)
        connection.end();
    },

































    RestrarUser: (req, res, next) => {
        
    }
}