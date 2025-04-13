const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = require('./Routes/Allroutes');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require("cors");

const PORT = 8081;

// In your backend entry file
app.use(cors({
  origin: [
    'https://dokjan.vercel.app',
    'http://localhost:5173',
    'http://localhost:5174'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Handle preflight
app.options('*', cors());
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
