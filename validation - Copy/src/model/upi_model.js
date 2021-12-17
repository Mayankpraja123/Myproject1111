const {Schema , model} = require("mongoose");
const upiSchema = new Schema({
   upi_id  : {type:String,required:true}
}
// ,{
//     versionKey:false,
//     timestamps:true
//}
);

module.exports = model("upi",upiSchema);


