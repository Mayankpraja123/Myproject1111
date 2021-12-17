
const express = require("express");
const { body, validationResult } = require('express-validator');

const CreditCard = require("../model/credit_card_model")
const router = express.Router();
const app = express();



router.post("/",body("creditcard_number").isLength({min:16,max:16}).withMessage("min and max digits in creadit cards is 16"),
body("expiry_date").custom((value)=>{
 
  console.log("expiray date:",value)
  var date = value.split("/").map(Number);
  console.log("date :: ",date);
  var month = date[0];
  var year = date[1];
  console.log(month,year);

  if(month >12 || month<1)
  {
    throw new Promise("please enter a valid month number")
  }

  return true;
}),
body("card_holder_name").custom(async(value)=>{
  
  console.log("card_golder_name::",value)
  var a = typeof value
  console.log(a)
  if(a!="string")
  {
    throw new Promise("please enter your name correctly")
  }
 
   return true;
 }),
body("ccv").isLength({min:3,max:3}).withMessage("only 3 digit is allowed"),
async(req,res)=>{
 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // let newErrors = errors.array().map(err => err.msg)
    let newErrors = errors.array().map(({msg,param,location})=>{
      return {
        [param] : msg,
      };
    });
    return res.status(400).json({ errors: newErrors });
  }
   // console.log("get absolute oathh wholepath",__dirname);
    try{
        const product = await CreditCard.create(req.body);
        return res.status(201).json({product})
    }catch(e){
     return res.status(500).json({status :"failed", message :e.message})
    }
})

module.exports = router;