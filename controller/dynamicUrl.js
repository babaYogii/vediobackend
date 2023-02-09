const { v4: uuidv4 } = require('uuid');
const meetingDetails=require('../Models/meeetingDetails')

exports.createMeeting=(req,res)=>{
console.log(req.body);
// JSON.parse(req.body.user)
// console.log(typeof JSON.parse(req.body.user))

   let {meetingName,sizeOfMeeting,scheduleDate,user }=req.body;
//    let meetingdate=new Date(scheduleDate);
    console.log(scheduleDate)
    console.log(meetingName,sizeOfMeeting,scheduleDate)
   const newurl = uuidv4()
    let meetingEndTime=(parseInt(scheduleDate)+60).toString();
        // user=JSON.parse(user)
    const meetingUrl=`${process.env.REACT_APP_HOST}/ROOM/${newurl}`
    // console.log(user);
    scheduleDate=scheduleDate-(18,000,000+1,800,000)
    const meetingValues=new meetingDetails({meetingName,sizeOfMeeting,scheduleDate,meetingUrl,user,meetingEndTime});


    meetingValues.save((error, data) => {
        if (error) {
            console.log(error)
            return res.status(400).json({ message: "Something went wrong" })
        }
        if (data) {
            console.log(user)
            return res.status(201).json({ message: "Meeting has been created SuccessFully ...!",meetingUrl });
        }
    })

}

exports.getMeetings=(req,res)=>{

    meetingDetails.find({user:req.user._id}).exec((error,meeting)=>{
        if(error) return res.status(400).json({error});
       console.log(meeting)
       res.status(201).json(meeting);
    })

}