const path = require("path");

module.exports = {
  login: (req, res) => {
    res.render(path.join(__dirname, "../views/users/login"));
  }, //logueo

  register: (req, res) => {
    res.render(path.join(__dirname, "../views/users/register"));
  }, //registro
};
