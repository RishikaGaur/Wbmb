const express=require("express")
const path = require('path');
const fs = require("fs")
const imgRouter=express.Router()
const image=require("../models/img")

imgRouter.post("/",(req,res)=>{
    
    image.create({
        image:{
            data:fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType:"image/jpg"
        }
    },(ans,err)=>{
        if(err){
            res.send(err)
        }
        res.send(ans)
    })
})

imgRouter.get("/",(req,res)=>{

})

module.exports=imgRouter