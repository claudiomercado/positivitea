const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
  //Home de productos
  products: (req, res) => {
		res.render(path.join(__dirname, "../views/products/products"), {products, toThousand})
	},
  
  productDetail: (req, res) => {
    let idProduct= req.params.id
    res.render(path.join(__dirname, "../views/products/productDetail"), {products, toThousand,idProduct});
  }, //detalle de un producto

  shoppingCart: (req, res) => {
    res.render(path.join(__dirname, "../views/products/shoppingCart"), {products,toThousand});
  }, //carro de compras

  create:(req,res)=>{
    res.render(path.join(__dirname,'../views/products/create'))
  },
  save:(req,res)=>{
    let product={
      name: req.body.name ,
      price: req.body.price,
      category: req.body.category,
      description: req.body.description,
      image: req.body.image
    }
    //leemos los productos ya registrador
    let archivoProduct= fs.readFileSync(path.join(__dirname,'../data/productsDataBase.json'),{encoding:'utf-8'})
    let productos
    if (archivoProduct =="") {
       productos=[]
    }else{
       productos= JSON.parse(archivoProduct)
    }

    productos.push(product)

   productosJSON= JSON.stringify(productos)
   fs.writeFileSync(path.join(__dirname,'../data/productsDataBase.json'),productosJSON)

    res.render(path.join(__dirname,'../views/products/list'), {products,toThousand})

  },
  list:(req,res)=>{
    res.render(path.join(__dirname,'../views/products/list'), {products,toThousand})
  },
  edit:(req,res)=>{
    let idProductEdit=req.params.id
    res.render(path.join(__dirname,'../views/products/edit'), {products,toThousand,idProductEdit})
  },
  update:(req,res)=>{
    res.send('voy por PUT')
    let archivoProduct= fs.readFileSync(path.join(__dirname,'../data/productsDataBase.json'),{encoding:'utf-8'})

  }
};
