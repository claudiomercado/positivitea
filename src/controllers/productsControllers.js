const fs = require('fs');
const path = require('path');
const rutaJSON= require('../data/productsDataBase.json')
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const usersControllers = require("../controllers/usersControllers");
let db = require('../../database/models')


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
  //Home de productos
  products: (req, res) => {
    db.Products.findAll()
      .then((product)=>{
		res.render(path.join(__dirname, "../views/products/products"), {product, toThousand})
      })
	},
  
  productDetail: (req, res) => {
    db.Products.findByPk(req.params.id)
      .then((product)=>{
        res.render(path.join(__dirname, "../views/products/productDetail"), {product, toThousand});
      })
  }, //detalle de un producto

  shoppingCart: (req, res) => {
    res.render(path.join(__dirname, "../views/products/shoppingCart"), {products,toThousand});
  }, //carro de compras

  create:(req,res)=>{
    res.render(path.join(__dirname,'../views/products/create'))
  },
  save:(req,res)=>{
    db.Products.create({
      name: req.body.name ,
      description: req.body.description,
      price: req.body.price,
      img: req.body.image,
      id_category: req.body.category
    })
    db.Products.findAll()
      .then((product)=>{
          res.render(path.join(__dirname,'../views/products/list'), {product,toThousand})
      })
    
  },
  list:(req,res)=>{
    db.Products.findAll({
      include:[{association:'category_product'}]
    })
      .then((product)=>{
        res.render(path.join(__dirname,'../views/products/list'), {product,toThousand})
      })
    
  },
  edit:(req,res)=>{
    db.Products.findByPk(req.params.id)
      .then((product)=>{
        res.render(path.join(__dirname,'../views/products/edit'), {product,toThousand})
      })
    
  },
  update:(req,res)=>{
    db.Products.update({
      name: req.body.name ,
      description: req.body.description,
      price: req.body.price,
      img: req.body.image,
      id_category: req.body.category
    },
    {
      where: {id:req.params.id }
    })
    db.Products.findAll()
      .then((product)=>{
        res.render(path.join(__dirname,'../views/products/list'), {product,toThousand})
      })   
      
  },
  delete:(req,res)=>{
    db.Products.destroy({
      where:{id:req.params.id}
    })
    db.Products.findAll()
      .then((product)=>{
        res.render(path.join(__dirname,'../views/products/list'), {product,toThousand})
      })  
  }
};
