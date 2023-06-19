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



mongoose.connect("mongodb+srv://Yogesh:Yogesh@cluster0.islatk2.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log("Connected")
}).catch((error)=>{console.log(error)});

const build=path.join(__dirname+'/public')
// path.join(__dirname+'/public')
app.use(express.static(build))


app.use(authRoutes);
app.use(roomRoutes);
app.use(meetingDetails)

app.get("/",(req,res)=>{
    res.send("Hello from index")
})

app.get('*',async(req,res)=>{
    res.sendFile(path.join(build,'index.html'))
})

//static file serve on this side

app.set('port',process.env.PORT || 8800)

app.listen(process.env.PORT || 8800,()=>{
    console.log("Listening on  port",process.env.port||8800)
})
