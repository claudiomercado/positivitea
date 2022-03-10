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
    res.render(path.join(__dirname, "../views/products/productDetail"));
  }, //detalle de un producto

  shoppingCart: (req, res) => {
    res.render(path.join(__dirname, "../views/products/shoppingCart"));
  }, //carro de compras
};
