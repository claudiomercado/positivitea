const path = require("path");

module.exports = {
  index: (req, res) => {
    res.render(path.join(__dirname, "../views/web/index"));
  }, //index home

  contacUs: (req, res) => {
    res.render(path.join(__dirname, "../views/web/contacUs"));
  }, //contactanos
};
