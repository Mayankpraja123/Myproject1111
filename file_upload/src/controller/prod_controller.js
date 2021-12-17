const express = require("express");
const Product = require("../model/product_model")
const router = express.Router();

router.get("/new",async function(req,res){
    console.log("new router::",req.body)
    const products = await Product.find().lean().exec();
    return res.render("products/new",{
        products,
    });
});


router.post("/",async function(req,res){
    console.log("post methos :: ")
const product = await Product.create(req.body);
return res.status(201).send({product})
});


router.get("/", async function(req,res){
    console.log("my get router is called")
    const products = await Product.find().lean().exec();
    return res.render("products/all",{
    products,
    })
})


router.post(
"/single",
async function (req,res){
    console.log("body ::",req.body)
    try{
            console.log(" post call from web site",req.body)
            const product = await Product.create({
            name :req.body.name,
            price: req.body.price,
            
        });
        console.log("this data is ruunign")
        console.log("product is create ot not  ::",product)
        return res.render("products/single",{product});
    }
    catch(err)
    {
        return res.status(400).send({err: err.message});
    }
}
);


module.exports = router
//this is running
