const Student=require("../models/student")

//name,roll_no,branch,starting_date

const first=async(req,res)=>{
    try{
        const result=await Student.find();
        res.send(result)
    }catch(err){
        res.status(500).json({
            status:"failure",
            error_message: err
        })
    }
}

const second=async(req,res)=>{
    try{

        // can also do
        // const temp=new Student(req.body)
        // temp.save(callback fn)
        //insert or insert many
        console.log(req.body);
        const result=await Student.create({
            name:req.body.name,
            roll_no:req.body.roll,
            branch:req.body.branch,
            starting_date:req.body.start
        });
        
        res.send(result)
    }catch(err){
        res.status(500).json({
            status:"failure",
            error_message: err
        })
    }
}

const third=async(req,res)=>{
    try{
        //findOne then Student.set(req.body) then save
        //update({_id:id},$set{})
        await Student.findByIdAndUpdate(req.params.id,{
            $set:{
            name:req.body.name,
            roll_no:req.body.roll,
            branch:req.body.branch,
            starting_date:req.body.start
            }
        }).then(()=>{
            res.send("record updated")
        }).catch(()=>{
            throw err
        })
    }catch(err){
        res.status(500).json({
            status:"failure",
            error_message: err
        })
    }
}

const fourth=async(req,res)=>{
    try{
        //findOne then remove
        await Student.findByIdAndDelete(req.params.id)
        res.send("This record is deleted")

    }catch(err){
        res.status(500).json({
            status:"failure",
            error_message: err
        })
    }
}

const fifth=async(req,res)=>{
    try{
        //findOne({_id:req.params.id})
        const result=await Student.findById(req.params.id);
        res.send(result)
    }catch(err){
        res.status(500).json({
            status:"failure",
            error_message:err
        })
    }
}

module.exports={
    first,
    second,
    third,
    fourth,
    fifth
}


//req.query.abc
//url?abc=5