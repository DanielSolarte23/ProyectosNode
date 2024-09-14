const express = require('express');
const ejs = require('ejs')
const path = require('path')
const multer = require('multer')
const uuid = require('uuid')

const router = require('../src/routes/index.routes')

//inicializacion
const app = express();


//configuracion
app.set('port', 4100);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares -> son codigos que se ejecutan antes de llegar a las rutas 
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, uuid.v4() + path.extname(file.originalname).toLocaleLowerCase())
    }
})

const upload = multer({
    storage,
    dest: path.join(__dirname, 'public/uploads'),
    limits: { fileSize: 2000000 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype)
        const extname = filetypes.test(path.extname(file.originalname))
        if(mimetype && extname){
            return cb(null, true);
        }
        cb("Error: Tipo de archivo no valido")
    }
}).single('image')

app.use(upload)

// Routes
app.use(router)

//Archivos Estaticos

app.use(express.static(path.join(__dirname, 'public')))

//Inicio del servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
})

