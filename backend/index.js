const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = require('./Routes/Allroutes');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require("cors");

const PORT = process.env.PORT;

// In your backend entry file
app.use(cors());

// Handle preflight
app.options('*', cors());
app.use(bodyParser.json());
app.use('/', router);

app.get('/ping', (req, res) => {
  res.send("PONGG");
});

mongoose.connect(process.env.MONGODB_URL)
.then(() => {
  console.log("MongoDB Connected ");
})
.catch((err) => {
  console.error(" MongoDB Connection Error:", err);
});

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
