const express = require('express')
const path = require('path')
const morgan = require('morgan')
const multer = require('multer')
const uuid = require('uuid')

//inicializaciones
const app = express()

//configuraciones
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');


//middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}));
app.use(multer({dest:path.join(__dirname, 'public/img/upload')}).single('image'))

//Variables Globales 

//Routes
app.use(require('./routes/index'))

//Archivos Estaticos

//inicializacion del servidor

app.listen(app.get('port'), ()=>{
    console.log(`Servidor corriendo en http://localhost:${app.get('port')}`);
    
})  