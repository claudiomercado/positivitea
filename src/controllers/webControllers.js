const fs = require('fs');
const path = require('path');
let db= require('../../database/models')
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
  index: (req, res) => {
    //index home
    db.Products.findAll()
      .then((product)=>{
        res.render(path.join(__dirname, "../views/web/index"), {product, toThousand})

      })
  },

  contacUs: (req, res) => {
    res.render(path.join(__dirname, "../views/web/contacUs"));
  }, //contactanos
};
