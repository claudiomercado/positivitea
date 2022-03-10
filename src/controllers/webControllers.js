const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
  index: (req, res) => {
    //index home
    res.render(path.join(__dirname, "../views/web/index"), {products, toThousand})
  },

  contacUs: (req, res) => {
    res.render(path.join(__dirname, "../views/web/contacUs"));
  }, //contactanos
};
