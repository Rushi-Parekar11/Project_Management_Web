const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const router = require('./Routes/Allroutes')
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require("cors");

const PORT = process.env.PORT || 8000;

//app.use(cors());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(bodyParser.json());
app.use('/', router);




mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
  console.log("Connected Successfully.....");
})
.catch((err) => {
  console.error("MongoDB Connection Error:", err);
});



app.get('/',(req,res)=>{
  res.send("hii")
})

app.get('/ping',(req,res)=>{
    res.send("PONG");
})

app.listen(PORT,()=>{
    console.log(`Server is Running at ${PORT}`)
})

