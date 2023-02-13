const express=require("express")
const cors = require("cors");
const path=require('path')

const app=express();
app.use(cors())
const mongoose= require('mongoose');
require('dotenv').config();
app.use(express.json());

const url = process.env.COSMOS_CONNECTION_STRING;
const authRoutes=require('./Routes/userRoutes')
const roomRoutes=require('./Routes/roomRoutes')
const meetingDetails=require('./Routes/meetingDetails')
mongoose.set('strictQuery', true)
mongoose.connect(url).then(()=>{
    console.log("Connected")
});



app.use(express.static(path.join(__dirname+'/public')))


app.use(authRoutes);
app.use(roomRoutes);
app.use(meetingDetails)

app.get("/",(req,res)=>{
    res.send("Hello from index")
})

//static file serve on this side

app.set('port',process.env.PORT || 8080)

app.listen(process.env.PORT || 8080,()=>{
    console.log("Listening on  port 8080")
})
