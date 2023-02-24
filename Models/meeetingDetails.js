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
        unique:true
    },user:{type : mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    imp:{
        type:Boolean
    },meetingDescription:{
        type:String
    }
    
},{timestamps:true});









module.exports=mongoose.model('meetingDetails',meetingDetails);