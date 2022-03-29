const express = require("express");
const router = express.Router();
const path = require("path");
const usersControllers = require("../controllers/usersControllers");
const {body} =require('express-validator')
const multer= require('multer');
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./public/img/avatars')
    },
    filename: (req,file,cb)=>{
        let fileName= `${Date.now()}_img${path.extname(file.originalname)}`
        cb(null, fileName)
    }
})
const uploadFile = multer({storage})
const validations =[
    body('username').notEmpty().withMessage('Debes completar el nombre de usuario'),
    body('email')
    .notEmpty().withMessage('Debes escribir un correo electrónico').bail()
    .isEmail().withMessage('Debes escribir un formato de correo válido'),
    body('password').notEmpty().withMessage('Debes completar la contraseña'),
    body('confirmPassword').notEmpty().withMessage('Debes completar la contraseña'),
    body('avatar').custom((value, {req})=>{
        let file=req.file
        let acceptedExtensions= ['.jpg', '.png']
        
        if (!file) {
            throw new Error('Debes subir una imagen')
        }else {
            let fileExtension= path.extname(file.originalname)
        if(!acceptedExtensions.includes(fileExtension)){
            
            throw new Error(`Las extensiones de archivos permitidas son ${acceptedExtensions.join(', ')}`)
        }}
       
        return true
    })

]

const validationsLogin=[
    
    body('email')
    .notEmpty().withMessage('Debes escribir un correo electrónico').bail()
    .isEmail().withMessage('Debes escribir un formato de correo válido'),
    body('password').notEmpty().withMessage('Debes escribir una contraseña')

]

router.get("/login", usersControllers.login);
router.post("/login", validationsLogin, usersControllers.processLogin);
router.get("/register", usersControllers.register);
router.post("/register", uploadFile.single('avatar'),validations ,usersControllers.save);


module.exports = router;
