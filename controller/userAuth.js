const User = require('../Models/user')
const jwt=require('jsonwebtoken')




exports.signup=(req,res)=>{
    User.findOne({ email: req.body.email }).exec((error, user) => {
        if (user) return res.status(403).json({
            message: 'User Already Registered'
        });
        const { firstName, lastName, email,  password,confirmPassword } = req.body

        const _user = new User({ firstName, lastName, email,password,confirmPassword })
    
    _user.save((error, data) => {
        if (error) {
            console.log(error)
            return res.status(400).json({ message: "Something went wrong" })
        }
        if (data) {
            return res.status(201).json({ message: "User created SuccessFully ...!" });
        }
    })
})
}

exports.signin=(req,res)=>{
    User.findOne({email:req.body.email}).exec((error,user)=>{
       if(error) {
        console.log(error)
        return res.status(400).json(error);
       }
        if(user){
            
            if(user.password===req.body.password){        
                const token=jwt.sign({_id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:'1d'})
                const {_id,firstName,lastName,email,fullName}=user;
           res.status(200).json({
            token:token,
            user:{_id,firstName,lastName,email,fullName},
            message:"Login success full"
           })
            }else{
                return res.status(400).json({message:"Error in login details"});
            }
        }
    })
}

