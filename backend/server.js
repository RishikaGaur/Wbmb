const mongoose=require("mongoose");
const express=require("express");
const app=express();
const Client=require("./models/client")
const bcrypt=require("bcrypt")
const bodyparser=require("body-parser")
const jwt=require("jsonwebtoken")
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
const cookieParser=require("cookie-parser");
const {check, validationResult}= require("express-validator");
app.use(cookieParser());
mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://rishika:rishika123@cluster0.9jbk311.mongodb.net/test").then(()=>{
    console.log("connected to db");
}).catch(err=>{
    console.log(err)
})
const salt=10;

//api
app.get("/",(req,res)=>{
    res.send("welcome");
})

app.post("/register",check("firstname").not().isEmpty(),check("lastname").not().isEmpty(),check('username').isEmail(),check('password').isLength({ min: 6 }).isAlphanumeric(),(req,res)=>{
    const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }else{
    console.log(req.body);
    try{
        bcrypt.hash(req.body.password,salt)
        .then((npass)=>{
            const output=Client.create({
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                username:req.body.username,
                password:npass,
            });
            console.log(output);
        }).catch((err)=>{
            console.log(err);
        })
        
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }

    let token;
    try{
        token=jwt.sign({username:req.body.username},"secretkeyoftoken",{expiresIn:"1h"});
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
    res.status(201).json({
        status:"success",
        data:{
            username:req.body.username,
            token:token
        }
    })
}
})

app.post("/login",async(req,res)=>{
    try{
        const person=await Client.findOne({username:req.body.username});
        console.log(person);
        if(person){
            const correct=await bcrypt.compare(req.body.password,person.password);
            if(correct){
                res.send("valid user")
                
            }
            else{
                res.send("wrong password")
            }
        }else{
            res.send("username does not exist")
        }
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }

})

app.get("/access",(req,res)=>{
    try{
        const tokn=req.headers.authorization.split(' ')[1]; 

        const payload=jwt.verify(tokn,"secretkeyoftoken")
        if(payload){
            res.send({
                status:"success",
                username:payload.username})
        }else{
            res.send("invalid token")
        }

    }catch(err){
        res.status(500).send(err)
    }
})


app.listen(4000, function(){
    console.log("App is running on Port 4000");
});