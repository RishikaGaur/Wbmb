const method1=(req,res)=>{
    res.send("welcome");

}
const method2=(req,res)=>{
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
}

const method3=async(req,res)=>{
    try{
        const person=await User.findOne({username:req.body.username});
        console.log(person);
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

}



module.exports={
    method1,
    method2,
    method3
}