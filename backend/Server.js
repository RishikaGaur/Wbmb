const mongoose=require("mongoose");
const express=require("express");
const app=express();

mongoose.connect("mongodb://localhost:27017/try", {
   useNewUrlParser: true,
   useUnifiedTopology: true
});


//apis


app.listen(3000, function(){
    console.log("App is running on Port 3000");
});