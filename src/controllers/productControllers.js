const path = require ('path')

module.exports={
    detail:(req, res)=>{
        res.sendFile(path.join(__dirname, "../views/producto_detalle.html"))
    }
}