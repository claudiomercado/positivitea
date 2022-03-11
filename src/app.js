const express = require("express");
const app = express();
const path = require("path");
const webRoutes = require("./routes/webRoutes");
const usersRoutes = require("./routes/usersRoutes");
const productsRoutes = require("./routes/productsRoutes")

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("/", webRoutes);
app.use("/", usersRoutes);      //*revisar la ruta, no se si "/" es la correcta
app.use("/products", productsRoutes);   //*revisar la ruta, no se si "/" es la correcta

app.listen(3030, () => {
  console.log("Servidor corriendo");
});
