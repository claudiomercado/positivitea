const express = require("express");
const app = express();
const path = require("path");
const webRoutes = require("./routes/webRoutes");
const usersRoutes = require("./routes/usersRoutes");
const productsRoutes = require("./routes/productsRoutes")
const methodOverride=require('method-override')

app.set("view engine", "ejs");
app.use(express.static("public"));
//Captura y convierte lo que viene de un formulario en un objeto literal y nos de la posibilidad de convertilo a un formato json
app.use(express.urlencoded({extended:false}))
app.use(express.json())
//Para poder usar PUT y DELETE
app.use(methodOverride('_method'))

app.use("/", webRoutes);
app.use("/", usersRoutes);      //*revisar la ruta, no se si "/" es la correcta
app.use("/products", productsRoutes);   //*revisar la ruta, no se si "/" es la correcta

app.listen(3030, () => {
  console.log("Servidor corriendo");
});
