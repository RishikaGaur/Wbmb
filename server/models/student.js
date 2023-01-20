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