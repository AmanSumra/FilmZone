const mongoose = require("mongoose");

const Connectdb = async () => {
  const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/filmzoneDb";
  
  try {
    await mongoose.connect(mongoURI);
    console.log("✅ Database connected successfully");
  } catch (e) {
    console.error("❌ Database connection error:", e.message);
    process.exit(1);
  }
};

module.exports = Connectdb;
