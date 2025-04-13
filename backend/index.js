const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = require('./Routes/Allroutes');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require("cors");

const PORT = 8081;

app.use(cors({
  origin: [ 'https://dokjan.vercel.app','http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));
app.use(cors());
app.options('*', cors()); // Handle all OPTIONS requests

app.use(bodyParser.json());
app.use('/', router);

app.get('/', (req, res) => {
  res.send("hii");
});

app.get('/ping', (req, res) => {
  res.send("PONGG");
});

mongoose.connect(process.env.MONGODB_URL)
.then(() => {
  console.log("MongoDB Connected ✅");
})
.catch((err) => {
  console.error("❌ MongoDB Connection Error:", err);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
