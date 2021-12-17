const express = require("express");//
const app = express();
const upiController= require("./controller/upi_controller");
const netController = require("./controller/net_banking_controller");
const cardController = require("./controller/credit_card_controller");
app.use(express.json());
app.use(express.static("public"));
app.set("view engine","ejs")

app.use("/upis",upiController);
app.use("/nets",netController);
app.use("/cards",cardController);


module.exports = app;

