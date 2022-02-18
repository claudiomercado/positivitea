const express = require("express");
const app = express();
const path = require("path");
const webRoutes = require('./routes/webRoutes');

/* const homeRoutes= require('./routes/home')
const productDetailRoutes=require('./routes/productDetail') */

app.set('view engine', 'ejs');
/* app.get("/", homeRoutes);
app.get("/product", productDetailRoutes); */

app.use('/',webRoutes)

app.use(express.static("public"));

app.listen(3030, () => {
  console.log("Servidor corriendo");
});
