const meetingDetails=require('../Models/meeetingDetails')



exports.deleteMeeting=async(req,res)=>{ 
    try {
        const id = req.params.id;
        const data = await meetingDetails.findByIdAndDelete(id)
        res.status(200).json(`Document with ${data.meetingName} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }

}


exports.updateMeeting=async(req,res)=>{
  
    const {meetingName,sizeOfMeeting,scheduleDate,meetingEndTime,meetingUrl,user} = req.body;
    const id=req.params.id;

try{   
        let result = await meetingDetails.updateOne({_id:id},
          {
            $set:{meetingName,sizeOfMeeting,scheduleDate,meetingEndTime,meetingUrl,user}
          })
          res.status(200).json({result,message:'Meeting updated successfuly'});
          console.log(req.params.id)
          console.log(result)
      
}catch(error){
      res.status(400).json({message:"Cannot update Meeting",error})
}
    













    // const {meetingName,sizeOfMeeting,scheduleDate,meetingEndTime,meetingUrl,user} = req.body;
    // const id=req.params.id;
    
}


