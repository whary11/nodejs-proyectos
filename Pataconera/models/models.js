'use strict'
var mysql      = require('mysql');
class Con{
    constructor(connection){
        const user = "root"
        const host = "localhost"
        const clave = ""
        const bd = "funes_sistema_manejador"
        this.connection = mysql.createConnection({
            host     : host,
            user     : user,
            password : clave,
            database : bd
          });
        this.connection.connect();
    }
    abc(consulta){
        // console.log(this.bd)
       this.connection.query(consulta, (error, resultado, fields) => {

        if(error){
            // this.error;
        }else{
            return resultado[0].razon_social;
            false;
            console.log(resultado[0].razon_social)
        }
        this.connection.end();  
       });
    }
}

var instancia = new Con();

var clientes = instancia.abc('SELECT id, razon_social FROM clientes_funes')

console.log(clientes)
// console.log(clientes)
