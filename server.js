const express=require("express")
const cors = require("cors");

const app=express();
app.use(cors())
const mongoose= require('mongoose');
require('dotenv').config();
app.use(express.json());

const url = process.env.COSMOS_CONNECTION_STRING;
const authRoutes=require('./Routes/userRoutes')
const roomRoutes=require('./Routes/roomRoutes')

mongoose.set('strictQuery', true)
mongoose.connect(url).then(()=>{
    console.log("Connected")
});


app.use(authRoutes);
app.use(roomRoutes);

app.get("/",(req,res)=>{
    res.send("Hello from index")
})



app.listen(8080,()=>{
    console.log("Listening on  port 8080")
})
