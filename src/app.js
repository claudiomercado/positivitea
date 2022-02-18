const express = require("express");
const app = express();
const path = require("path");
const webRoutes = require("./routes/web/webRoutes");
const usersRoutes = require("./routes/users/usersRoutes");
const productsRoutes = require("./routes/products/productsRoutes")


app.set("view engine", "ejs"); 


app.use("/", webRoutes);
app.use("/", usersRoutes);      //*revisar la ruta, no se si "/" es la correcta
app.use("/", productsRoutes);   //*revisar la ruta, no se si "/" es la correcta


app.use(express.static("public"));

app.listen(3030, () => {
  console.log("Servidor corriendo");
});
