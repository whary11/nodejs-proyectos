'use strict'
var express = require('express')
// Libreria para conectar node js y Mongo DB
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
// Para recibir las imagenes sencillas en node js con multer
var multer = require('multer')
var cloudinary = require('cloudinary')

// Configuración personal de Cloudinary
cloudinary.config({
    cloud_name:'diloywxpi',
    api_key:'375452183975471',
    api_secret:'wHHFrpegr23Pvt_4DsztTanVntk'
})
// Nombre de la base de datos (comidas)

// Conectarnos a la base de datos
mongoose.connect('mongodb://localhost/comidas')
// Estrucutura de los datos a ingresar
var esquemaProducto = {
    titulo:String,
    descripcion:String,
    imagen:String,
    precio:Number
};
// Definir la estructora de datos a guarddar
var Producto = mongoose.model('Producto', esquemaProducto)

var app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
// Le indicamos a express que utilice multer
var carga = multer({ dest: 'imagenes/' })
// Indicarle a nuestra aplicación que usaremos el motor de vistas de Jade
app.use(express.static('public'))
app.set('view engine', 'jade')
// Indicamos donde van a estar nuestros archivos estaticos (img, js, css ...)

// Rutas (Enrutador)
// Ruta para editar los productos
app.get('/admin/editar/:id', function(solicitud, respuesta) {
  // respuesta.render('admin/editar')
  var id_producto  = solicitud.params.id
  Producto.findOne({"_id": id_producto}, function(error, producto){
      respuesta.render('admin/editar', {producto: producto})
  })

})



//Ruta para mostrar productos en la zona de administración
app.get('/admin',function(solicitud, respuesta){
    Producto.find(function(error, documento){
        if (error) {
            respuesta.render('menu/index')
        }else{
            respuesta.render('admin/productos', {productos: documento})
        }
    })
})
// Enrutamiento del index de nuestra aplicación
app.get('/', function(solicitud, respuesta){
    respuesta.render('index')
});
// Ruta para listar los productos

app.get('/menu', function(solicitud, respuesta){
    Producto.find(function(error, documento){
        if (error) {
            respuesta.render('menu/index')
        }else{
            respuesta.render('menu/index', {productos: documento})
        }
    })

})






// Ruta para recibir la petición del frmulario
app.post("/menu",carga.single('image_avatar'), function(solicitud, respuesta){
//// Validamos la contraseña
    if (solicitud.body.clave == '1234') {
        // Guardado de productos en la base de datos
        var data = {
            titulo:solicitud.body.titulo,
            descripcion:solicitud.body.descripcion,
            imagen:solicitud.body.image_avatar,
            precio:solicitud.body.precio
        }
        // Instancias nuetra base de datos
        var producto = new Producto(data)
        // Subir la imagen a claudinary
        cloudinary.uploader.upload(solicitud.file.path, function(result) {
            // Guardar la información en la base de datos
            producto.imagen = result.url;
            producto.save(function(error){
                console.log(result)
                respuesta.render('index')
            })
          });
    }else{
        respuesta.render('menu/nuevo')
    }

})
// Ruta para crear nuevos productos
app.get('/menu/nuevo',function(solicitud, respuesta) {
    respuesta.render('menu/nuevo')
})
app.listen(8080);
