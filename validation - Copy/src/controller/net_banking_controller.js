
const express = require("express");
const { body, validationResult } = require('express-validator');

const Net = require("../model/net_banking_model")
const router = express.Router();
const app = express();


router.post("/",
body("username").custom(async(value)=>{
  console.log("net model")
  console.log("username ::" ,value);
  //const username = /^\w+@\w+$/.test(value)
  const username = /^\w+@[a-zA-Z]+?\.[a-zA-Z]{2,20}$/.test(value)
 
   if(!username)
   {
     throw new Error("username  upi is working not is required ")
   }
   const productbyEmail = await Net.findOne({username:value}).lean().exec();
//   console.log("username ::",productbyEmail);
   if(productbyEmail)//null is comming 
   {
     throw new Error("please try with a different username address")
   }
   return true;
 }),
 body("password").custom((value)=>{

  value_size = value.length;
 
  if(value_size <=4 || value_size >=20)
  {
     throw new Error("minimum length should be 8 & maximim 20");
  }
 
  //var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  //const isNumber = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(value);
 
 // const isNumber = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(value);
  //  const isNumber =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(value);
  //  console.log("isnumber",isNumber);
var special_charater = 0
  for(var i = 0; i <value.length;i++)
  {
    //console.log(i,value[i])
    if(value[i] == "@" ||value[i] == "#" || value[i] == "$" || value[i] == "&" ) 
   special_charater++
  }
 if(special_charater  == 0)
{
  throw new Error("mimium 1  special character is not present in your passwords")
} 
   return true
 }),
async(req,res)=>{
 // console.log(body("name")); // seee the all the moethos funcion for validationd 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // let newErrors = errors.array().map(err => err.msg)
    let newErrors = errors.array().map(({msg,param})=>{
      return {
        [param] : msg,
      };
    });
    return res.status(400).json({ errors: newErrors });
  }
   // console.log("get absolute oathh wholepath",__dirname);
    try{
        const ans = await Net.create(req.body);
        return res.status(201).json({ans})
    }catch(e){
     return res.status(500).json({status :"failed", message :e.message})
    }
})

module.exports = router;