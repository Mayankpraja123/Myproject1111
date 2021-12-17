const app = require("./index");
const connect = require("./configs/db")
app.listen(3500,async function(){
    await connect()
    console.log("lstening on port 3500");
})