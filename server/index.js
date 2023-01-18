const mongoose=require("mongoose");
const express=require("express");
const app=express();
const control=require("./controller/usercontroller")


const User=require("./models/user")
const bcrypt=require("bcrypt")
const bodyparser=require("body-parser")
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
const {check, validationResult}= require("express-validator");

const dotenv = require("dotenv");
dotenv.config();

mongoose.set("strictQuery", false);

const db= process.env.MONGOLAB_URI;
// console.log(db)
mongoose.connect(db).then(()=>{
    console.log("connected to mongodb");
}).catch(err=>{
    console.log(err)
})
const salt=10;


app.get("/",control.method1)

app.post("/register",
check("firstname").not().isEmpty(),
check("lastname").not().isEmpty(),check('username').isEmail(),
check('password').isLength({ min: 6 }).isAlphanumeric(),
control.method2)

app.post("/login",control.method3)

app.listen(3000, function(){
    console.log("App is running on Port 3000");
});














// const express=require("express")
// const app=express()
// const http=require("http")
// const cors=require("cors")
// const {Server}=require("socket.io")

// app.use(cors())
// const server=http.createServer(app)

// const io=new Server(server,{
//     cors:{
//         origin:"http://localhost:3000",
//         methods:["GET","POST"],
//     },
// });


// io.on("connection",(socket)=>{
//     //start
//     console.log("User connected -",socket.id);

//     socket.on("hello",(arg)=>{
//         console.log(arg)
//         // document.getElementById("response").innerHTML+="<br/>"+arg
//     })


//     //end
//     socket.on("disconnect",()=>{
//         console.log("user disconnected -",socket.id)
//     })
// })

// server.listen(3001,()=>{
//     console.log("listening")

// })