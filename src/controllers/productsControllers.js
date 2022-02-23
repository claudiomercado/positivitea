const path = require("path");

module.exports = {
  products: (req, res) => { 
    res.render(path.join(__dirname, "../views/products/products"));
  }, //tdos los productos
  

  productDetail: (req, res) => {
    res.render(path.join(__dirname, "../views/products/productDetail"));
  }, //detalle de un producto

  shoppingCart: (req, res) => {
    res.render(path.join(__dirname, "../views/products/shoppingCart"));
  }, //carro de compras
};
