const mongoose=require("mongoose")
const schema=mongoose.Schema

const studentSchema=new schema({
    name:{
        type:String,
        required:true
    },
    roll_no:{
        type:String,
        required:true,
        unique:true
    },
    branch:{
        type:String,
        required:true
    },
    starting_date: {
        type:Date,
        //default:Date.now
        required:true
    }

},{
    collection:"student_info"
}
)

module.exports = mongoose.model("student",studentSchema)


//enum, path for validation in schema

//  name:{
//     type:String,
//     validate:[fn,"error"]  
// }

// const fn=(v)=>{
//     return v.length>5
// }

// mongoose.Schema.path("name").validate((v)=>{
//     return v.length>5
// },"error")

// field:[Schema.Types.ObjectId],
// field:Schema.Types.mixed
//errorHandler, okay package