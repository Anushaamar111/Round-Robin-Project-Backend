import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Set environment variable to force TLS version
    process.env.NODE_OPTIONS = "--tls-min-v1.2";
    
    const options = {
      ssl: true,
      tls: true,  // Only for testing
      retryWrites: true
    };

    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, options);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
