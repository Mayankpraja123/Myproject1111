
const express = require("express");
const { body, validationResult } = require('express-validator');

const Upi = require("../model/upi_model")
const router = express.Router();
const app = express();

router.get("/",async function(req,res){
  console.log("new ::",req.body)
  const upi_list = await Upi.find().lean().exec();
  return res.status(201).send({upi_list})
});

//new method ok
router.get("/new",async function(req,res){
  console.log("new ::",req.body)
  const upis = await Upi.find().lean().exec();
  console.log("upi_ids ::",upis)
  return res.render("products/new")
});


router.get("/:id",async function(req,res){
  console.log("get router is running :::",req.body)
  const upis = await Upi.findById(req.param.id).lean().exec();
  console.log("upis:",upis)
  return res.render("products/single",{
    upis,
  })
});

// workig
router.post("/",
body("upi_id").custom(async(value)=>{

  console.log("reponse gettig from posman ",value);
  
  // var a = JSON.stringify(value);
  // console.log("aaaaa::",a)

  // const myvalue = JSON.parse(a)
  // console.log("my value",myvalue);

  console.log("upi_id ::" ,(value));
  const upi_id = /^\w+@\w+$/.test(value)

   if(!upi_id)
   {
     throw new Error("Please enter the valid upi_id")
   }
   const productbyEmail = await Upi.findOne({upi_id:value}).lean().exec();
   if(productbyEmail)
   {
     throw new Error("Please try with a different upi_id address")
   }
   return true;
 }),
async(req,res)=>{

 console.log("req::",req.body)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    
    let newErrors = errors.array().map(({msg,param})=>{
      return {
        [param] : msg,
      };
    });
    console.log("k running")
    return res.status(400).json({ errors: newErrors });
  }
   
    try{
        const upi_resquest = await Upi.create(req.body);
        console.log("upi_resquest",upi_resquest)
        return res.status(201).json({upi_resquest})
    }catch(e){
     return res.status(500).json({status :"failed", message :e.message})
    }
});



module.exports = router;