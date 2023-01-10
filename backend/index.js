const mongoose=require("mongoose");
const express=require("express");
const app=express();
const User=require("./models/user")
const bcrypt=require("bcrypt")
const bodyparser=require("body-parser")
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
const {check, validationResult}= require("express-validator");


mongoose.connect("mongodb+srv://rishika:rishika123@cluster0.9jbk311.mongodb.net/test").then((success)=>{
    console.log(success);
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
            const output=User.create({
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                username:req.body.username,
                password:npass,
            });
            res.send(output);
        }).catch((err)=>{
            console.log(err);
        })
        
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}
})

app.post("/login",async(req,res)=>{
    try{
        const person=await User.findOne({username:req.body.username});
        // console.log(person);
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

app.listen(3000, function(){
    console.log("App is running on Port 3000");
});