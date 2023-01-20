const mongoose=require("mongoose");
const express=require("express");
const app=express();
const userRouter=require("./routes/userroute")
const stuRouter=require("./routes/studentroute")
const jwtRouter=require("./routes/jwtroute")
const nodemailer=require("nodemailer")
// const logger=require("morgan")
// app.use(logger("dev"))

const bodyparser=require("body-parser")
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//config
const dotenv = require("dotenv");
dotenv.config();

//connection to database

mongoose.set("strictQuery", false);

const db= process.env.MONGOLAB_URI;

//can also use 
// mongoose.createConnection("")
mongoose.connect(db).then(()=>{
    console.log("connected to mongodb");
}).catch(err=>{
    console.log(err)
})


//signup and signin api

app.use("/", userRouter)

//jwt sign and verify

app.use("/token",jwtRouter)


//student api

app.use("/student",stuRouter)

//email sender using nodemailer
app.post("/send/email",async(req,res)=>{
    const password=process.env.PASS
    // console.log(password)
    let transport = nodemailer.createTransport({
        host:"smtp.gmail.com",
        service: "gmail",
        port:465,
        secure:true,
        auth: {
          user: "gaurrishika156@gmail.com",
          pass: password
        }
    });

    message = {
        from: "gaurrishika156@gmail.com",
        to: "gaurrishika156@gmail.com",
        subject: "Testing Sending Emails",
        text: "Hello how are  you?"
        //html:"<h1>hello</h1>"
    }
    transport.sendMail(message, (err, info)=>{
        if (err) {
          console.log(err)
        } else {
          console.log(info);
        }
    })
})

//server
// can also use 
// require("http").createServer(app).listen(3000)

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