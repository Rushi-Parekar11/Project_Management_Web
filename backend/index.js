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
  origin: ['http://localhost:5173', 'http://localhost:5174'], // Allow multiple origins
  credentials: true // If using cookies or authentication
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

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB Connected ✅");

  // Start server only after DB is connected
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error("❌ MongoDB Connection Error:", err);
});


