const express = require("express");
const productsController= require("./controller/prod_controller");
const app = express();
app.use(express.json());
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine","ejs");
app.use("/products",productsController);
module.exports = app;



