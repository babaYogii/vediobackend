const jwt = require('jsonwebtoken')
const meetingDetails=require('../Models/meeetingDetails')

exports.requiresignin = (req, res, next) => {

    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
    }else{
    return res.status(400).json({message:"Sign in First"})
    }
    next();

}



exports.isUrlValid=(req,res,next)=>{

    const {meetingUrl}=req.body;
    console.log(req.body)

    meetingDetails.find({meetingUrl:meetingUrl}).exec((error,meeting)=>{
        if(error) return res.status(400).json({error});
       console.log(meeting)
       if(meeting){
        if(meeting.length===0){
           return res.status(404).json({message:"No meetings found"})
         }
           return res.status(200).json(meeting);
       }else{
        return res.status(400).json({message:"Something went wrong"})
       }
       
       
    })





}