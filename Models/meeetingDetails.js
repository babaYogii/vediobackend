const mongoose=require('mongoose');



const meetingDetails=new mongoose.Schema({
    meetingName:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:20
    },
    sizeOfMeeting:{
        type:Number,
        required:true,
        trim:true,
        min:1,
        max:15
    },scheduleDate:{
        type:String,
        required:true,
    },meetingEndTime:{
        type:String,
        required:true
    },meetingUrl:{
        type:String,
    },user:{type : mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    imp:{
        type:Boolean
    }
    
},{timestamps:true});









module.exports=mongoose.model('meetingDetails',meetingDetails);