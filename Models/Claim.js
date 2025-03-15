import mongoose from "mongoose";

const claimSchema = new mongoose.Schema({
  ip: String,
  cookie: String,
  timestamp: { type: Date, default: Date.now },
});


export default mongoose.model("Claim", claimSchema);