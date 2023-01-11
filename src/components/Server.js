const {Server}=require("socket.io");
const {createServer}=require("http");
const app=require("express");

const httpServer=createServer(app);
const io=new Server(3000,{});
io.on("connection",(socket)=>{
    console.log(socket.id);
});
httpServer.listen(3000);