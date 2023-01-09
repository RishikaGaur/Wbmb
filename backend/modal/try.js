const mongoose=require("mongoose");

const listSchema = {
    Name: String,
    Branch: String,
 }; 

 const List = mongoose.model("List", listSchema);