

const {Schema , model} = require("mongoose");

const netSchema = new Schema({
    username : {type:String,required:true},
    password :{type:String,required:true}

},{
    versionKey:false,
    timestamps:true
});

module.exports = model("net",netSchema);
