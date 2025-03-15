import mongoose from "mongoose";

export const couponSchema = new mongoose.Schema({
  code: String,
  assigned: { type: Boolean, default: false },
});

export default mongoose.model("Coupon", couponSchema);
