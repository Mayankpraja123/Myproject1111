const {Schema , model} = require("mongoose");
const CreditCardSchema = new Schema({
    creditcard_number : {type :Number,required:true},
    expiry_date :{type :String,required:true},
    card_holder_name:{type:String,reqiured:true},
    ccv:{type :Number,required:true},
},{
    versionKey:false,
    timestamps:true
});

module.exports = model("card",CreditCardSchema);

