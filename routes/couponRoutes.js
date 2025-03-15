import express from "express";
import Coupon from "../Models/Coupon.js";
import Claim from "../Models/Claim.js";
import preventAbuse from "../middleware/middleware.js";

const router = express.Router();

// Function to get next available coupon
const getNextCoupon = async () => {
    const coupon = await Coupon.findOne({ assigned: false });
    if (coupon) {
        coupon.assigned = true;
        await coupon.save();
        return coupon.code;
    }
    return null;
};

// Route: Claim a coupon
router.post("/claim", preventAbuse, async (req, res) => {
    const coupon = await getNextCoupon();
    if (!coupon) return res.status(400).json({ message: "No more coupons available!" });

    res.json({ message: `Coupon ${coupon} claimed successfully!` });
});

// Route: Check claim status
router.get("/status", async (req, res) => {
    const ip = req.ip;
    const existingClaim = await Claim.findOne({ ip });

    if (!existingClaim) return res.json({ canClaim: true });

    const timeRemaining = Math.ceil((existingClaim.timestamp.getTime() + 60 * 60 * 1000 - Date.now()) / 1000);
    res.json({ canClaim: timeRemaining <= 0, timeRemaining });
});

export default router;
