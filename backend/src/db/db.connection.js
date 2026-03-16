const mongoose = require('mongoose');

async function connectDB() {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`);
    console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

module.exports = connectDB;