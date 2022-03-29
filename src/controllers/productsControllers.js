const fs = require('fs');
const path = require('path');
const rutaJSON= require('../data/productsDataBase.json')
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
     // id:uuid(),
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
    const id = req.params.id;
    const productOrig = rutaJSON.find((prod) => prod.id.toString() === id);

    const input = req.body;

    const newProduct = {
      ...input,
      id: productOrig.id,
      image: productOrig.image
    };
    async (data)=>{
      let productsJSON = rutaJSON.map(product=>{
        if (product.id== data.id) {
          product = data
        }
        return product
      })
      await fs.writeFile(
        path.resolve(__dirname, rutaJSON),
        JSON.stringify(productsJSON),
        function (err) {
          if (err) {
            console.log(err);
            return;
          }
          console.log('LISTO');
        }
      );
    }

    //updateProduct(newProduct);
  /*  let productEdit
    let productEditSave
    let idProductEdit=req.params.id
 productEdit={
  name: req.body.name ,
      price: req.body.price,
      category: req.body.category,
      description: req.body.description,
      image: req.body.image
}
    let archivoProduct= fs.readFileSync(path.join(__dirname,'../data/productsDataBase.json'),{encoding:'utf-8'})
    
      let archivoProductJSON= JSON.parse(archivoProduct)
      archivoProductJSON.map(current=>{
        if (current.id==idProductEdit) {
          
          current.name=productEdit.name
          current.price=productEdit.price
          current.category=productEdit.category
          current.description=productEdit.description
          current.image=productEdit.image
          
        }
        productEditSave=JSON.stringify(current)
        console.log(productEditSave);
        fs.writeFileSync(path.join(__dirname,'../data/productsDataBase.json'),productEditSave)
        
      })
      */
      
      res.render(path.join(__dirname,'../views/products/list'), {products,toThousand})
  },
  delete:(req,res)=>{
    let idProductEdit=req.params.id
    
    let archivoProduct= fs.readFileSync(path.join(__dirname,'../data/productsDataBase.json'),{encoding:'utf-8'})
    
   // let archivoProductJSON= JSON.parse(archivoProduct)
   archivoProduct.foreach(current=>{
      if (current.id==idProductEdit) {
        let borrar={
          name:current.name,
          price: current.price,
          category: current.category,
          description:current.description,
          image: current.image
        }
        archivoProductJSON.splice(borrar)
        
      }
     
    })
    res.send('Es delete')
  }
};
