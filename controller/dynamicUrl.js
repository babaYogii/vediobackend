const Mailgen = require('mailgen');
const { v4: uuidv4 } = require('uuid');
const meetingDetails=require('../Models/meeetingDetails')
const nodemailer = require("nodemailer")

exports.createMeeting=(req,res)=>{


   let {meetingName,sizeOfMeeting,scheduleDate,user,payload,imp }=req.body;
   let {email}=user

console.log(email)
   const newurl = uuidv4()
   let meetingEndTime=(parseInt(scheduleDate)+600000).toString();
       
   const meetingUrl=`https://techmeets-app.azurewebsites.net/room/${newurl}`
   
   const meetingValues=new meetingDetails({meetingName,sizeOfMeeting,scheduleDate,meetingUrl,user,meetingEndTime,imp});



    const date= new Date(parseInt(scheduleDate));

    const emails=payload.emails;
    

   const config={
    service:'gmail',
    auth: {
        user:"kodlingeyogesh@gmail.com",
        pass: "ughhjjheekzqavnf"
      },
      port:465,
      host:'smtp.gmail.com'
   }

   let transporter = nodemailer.createTransport(config);

   const mailgen=new Mailgen({theme:'default',

   product:{
    name:user.fullName,
    link:'https://techmeets-app.azurewebsites.net'
   }


})





const response={
    body:{
        name:"",
        intro:meetingName.toUpperCase(),
        table:{data:[{Time:date,}]},
        outro:`Follow the url ${meetingUrl}`,
    }
   }


let mail=mailgen.generate(response)


console.log(email)



let message={
    from:{email},
    to:emails,
    text:'Please join the meeting',
    subject:`You are Invited for ${meetingName}`,
    html:mail
}





    meetingValues.save((error, data) => {
        if (error) {
            console.log(error)
            
            return res.status(400).json({ message: "Something went wrong" })
        }
        if (data) {
            console.log(user)
            transporter.sendMail(message).then(()=>{
               console.log("You should receive a message");
            }).catch((error)=>{
                console.log(error)
            })
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