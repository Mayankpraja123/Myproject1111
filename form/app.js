
const express = require("express");
const app = express();
const port = 5999;
const bodyParser = require("body-parser");
const {check,validationResult} = require("express-validator")
app.set("view engine","ejs");
const urlencodedParser = bodyParser.urlencoded({extended:false});
app.get("",(req,res)=>{
    res.render("index")
});

app.get("/register",(req,res)=>{
    res.render("register")
});

app.post("/register",urlencodedParser,[
    check("name")
    .isLength({min:1}).withMessage("please enter the valid user id")
], (req,res)=>{
  //  res.render("index")
  console.log("req body",req.body)
  res.json(req.body)
});


// app.post("/register",
// body("upi_id").custom(async(value)=>{

//   console.log("reponse gettig from posman ",value);
  


//   console.log("upi_id ::" ,(value));
//   const upi_id = /^\w+@\w+$/.test(value)

//    if(!upi_id)
//    {
//      throw new Error("Please enter the valid upi_id")
//    }
//    const productbyEmail = await Upi.findOne({upi_id:value}).lean().exec();
//    if(productbyEmail)
//    {
//      throw new Error("Please try with a different upi_id address")
//    }
//    return true;
//  }),
// async(req,res)=>{

//  console.log("req::",req.body)
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
    
//     let newErrors = errors.array().map(({msg,param})=>{
//       return {
//         [param] : msg,
//       };
//     });
//     console.log("k running")
//     return res.status(400).json({ errors: newErrors });
//   }
   
//     try{
//         const upi_resquest = await Upi.create(req.body);
//         console.log("upi_resquest",upi_resquest)
//         return res.status(201).json({upi_resquest})
//     }catch(e){
//      return res.status(500).json({status :"failed", message :e.message})
//     }
// });





app.listen(port,()=> {
    console.log(`app listenin gon port : ${port}`)
})