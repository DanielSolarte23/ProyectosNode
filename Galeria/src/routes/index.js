const { Router } = require('express')
const router = Router()


router.get('/', (req, res) => {
    res.send("Index Page")
})

router.get('/upload', (req, res) => {
    res.render('upload');
});

router.post('/upload',(req,res)=>{
    res.send('Subido')
})

router.get('/image/:id', (req,res)=>{
    res.send('Profile Imagen')
})

router.get('/image/:id/delete/', (req,res)=>{
    res.send('imagen delete')
})

module.exports = router