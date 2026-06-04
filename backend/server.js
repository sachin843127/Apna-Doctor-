const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const chatRoutes = require("./routes/chat.routes");
const symptomRoutes = require("./routes/symptom.routes");
const recordRoutes = require("./routes/record.routes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/symptom", symptomRoutes);
app.use("/api/records", recordRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Apna Doctor Backend Running 🚀');
});

// DB + Server start
console.log("Server starting up...");
console.log("Checking MONGO_URI env variable...");
if (!process.env.MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI is missing or undefined in environment variables!");
  process.exit(1);
} else {
  console.log("MONGO_URI is present, connecting...");
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected ✅');
    const port = process.env.PORT || 5000;
    app.listen(port, () =>
      console.log(`Server running on port ${port} 🚀`)
    );
  })
  .catch(err => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });
