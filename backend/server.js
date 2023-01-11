const mongoose=require("mongoose");
const express=require("express");
const app=express();
const Client=require("./models/client")
const bcrypt=require("bcrypt")
const bodyparser=require("body-parser")
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
const cookieParser=require("cookie-parser");
const {check, validationResult}= require("express-validator");
app.use(cookieParser());
mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://rishika:rishika123@cluster0.9jbk311.mongodb.net/test").then((success)=>{
    console.log(success);
}).catch(err=>{
    console.log(err)
})

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
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            let data = {
                time: Date(),
                userId: 12,
            }
  
            const token = jwt.sign(data, jwtSecretKey);
  
            res.send(token);
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
        console.log(person);
        if(person){
            const correct=await bcrypt.compare(req.body.password,person.password);
            if(correct){

                let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
                let jwtSecretKey = process.env.JWT_SECRET_KEY;
                const token = req.header(tokenHeaderKey);
  
                const verified = jwt.verify(token, jwtSecretKey);
                if(verified){
                    return res.send("valid user");
                }else{
                    return res.status(401).send(error);
                }
                
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