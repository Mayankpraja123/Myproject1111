const {Schema , model} = require("mongoose");
const productSchema = new Schema({
    name :{type : String, required:true},
    price :{type :Number,required:true},
    image_urls :{type:String,required:false}
},{
    versionKey:false,
    timestamps:true
});

module.exports = model("product",productSchema);
