const mongoose=require("mongoose");
const express=require("express");
const app=express();
const userControl=require("./controller/usercontroller")
const studentControl=require("./controller/studentcontroller")

const validateUser=require("./validator/userValidator")

const bodyparser=require("body-parser")
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());


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


//signup and signin api

app.get("/",userControl.method1)

app.post("/register",validateUser,userControl.method2)

app.post("/login",userControl.method3)

//student api

app.get("/student",studentControl.first)

app.post("/student",studentControl.second)

app.put("/student/:id",studentControl.third)

app.delete("/student/:id",studentControl.fourth)

app.get("/student/:id",studentControl.fifth)


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