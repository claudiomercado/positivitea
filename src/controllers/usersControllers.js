const path = require("path");
const fs = require('fs');
const rutaJSON= require('../data/usersDataBase.json')
const userFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
const products = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/productsDataBase.json'), 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const {validationResult}=require('express-validator');

module.exports = {
  login: (req, res) => {
    
    res.render(path.join(__dirname, "../views/users/login"));
  }, //logueo
  
  processLogin: (req,res) => {
    const resultValidation=validationResult(req)
    if (resultValidation.errors.length > 0) {
      res.render(path.join(__dirname, "../views/users/login"),{errors: resultValidation.mapped(), oldData: req.body})
    }else{
      
      let result=[]
      let userLogin={
        email: req.body.email,
        password: req.body.password
       }
       let archivoUser= fs.readFileSync(userFilePath,{encoding:'utf-8'})
       let archivoUserParse=JSON.parse(archivoUser)
       let imgAvatar
       let nameAvatar

      for (const data in archivoUserParse) {
        if (archivoUserParse[data].email==userLogin.email && archivoUserParse[data].password == userLogin.password) {
          result.push('ok')
          nameAvatar=archivoUserParse[data].username
          imgAvatar=archivoUserParse[data].filename
          
          console.log(imgAvatar);
        }else{
          result.push('credenciales mal')
        }
        }
        if (result.includes('ok')) {
          res.render(path.join(__dirname, "../views/web/index"), {products,imgAvatar,nameAvatar, toThousand})

        }else{
          res.render(path.join(__dirname, "../views/users/login"),{invalid: 'El usuario y/o contraseña son incorrectos.', invalid2: 'Por favor, vuelve a intentarlo.'})
        }
       }
    
   
  },
  register: (req, res) => {
    res.render(path.join(__dirname, "../views/users/register"));
  }, //registro
  save:(req,res)=>{
    const resultValidation=validationResult(req)
    let imgAvatar
    let nameAvatar
    if (resultValidation.errors.length > 0) {
      res.render(path.join(__dirname, "../views/users/register"),{errors: resultValidation.mapped(), oldData: req.body})
    }else{
      let user={
        // id:uuid(),
        username: req.body.username ,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        avatar:req.file
       }
       imgAvatar=user.avatar.filename
       nameAvatar=user.username
       //leemos los usuarios ya registrador
       let archivoUser= fs.readFileSync(userFilePath,{encoding:'utf-8'})
       let usuarios
       if (archivoUser =="") {
         usuarios=[]
       }else{
         usuarios= users
       }
   
       usuarios.push(user)
   
      usuariosJSON= JSON.stringify(usuarios)
      fs.writeFileSync(userFilePath,usuariosJSON)
      console.log('Usuario creado');
   
      res.render(path.join(__dirname, "../views/web/index"), {products,imgAvatar,nameAvatar, toThousand})

    }
    

  /*  let error=validationResult(req)
    const valores=req.body
    
    if (error.errors.length > 0) {

      res.render(path.join(__dirname, "../views/users/register"),{errors: error.array(),valores})
      console.log(error.array());
    }else{
      let user={
        // id:uuid(),
        username: req.body.username ,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        avatar:req.file
       }
       //leemos los usuarios ya registrador
       let archivoUser= fs.readFileSync(userFilePath,{encoding:'utf-8'})
       let usuarios
       if (archivoUser =="") {
         usuarios=[]
       }else{
         usuarios= users
       }
   
       usuarios.push(user)
   
      usuariosJSON= JSON.stringify(usuarios)
      fs.writeFileSync(userFilePath,usuariosJSON)
      console.log('Usuario creado');
   
       res.redirect('/')
     
  }*/

  },
};
