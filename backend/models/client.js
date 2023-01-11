const mongoose=require("mongoose");

const Schema=mongoose.Schema
const clientSchema = new Schema({
    firstname:{
        type:"String",
        required:true
    },
    lastname:{
        type:"String",
        required:true
    },
    username: {
        type:"String",
        required:true,
        unique:true
    },
    password: {
        type:"String",
        required:true
    }
 })

 module.exports = mongoose.model("Client", clientSchema);