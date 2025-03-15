import Claim from "../Models/Claim.js";

const preventAbuse = async( req, res, next)=> {
    const ip = req.ip
    const cookie = req.cookies.claimed || (Math.random() + 1).toString(36).substring(7);

    // Restrict claims within 1 hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const existingClaim = await Claim.findOne({
        $or: [{ ip }, { cookie }],
        timestamp: { $gte: oneHourAgo },
    });

    if (existingClaim) {
        const timeRemaining = Math.ceil((existingClaim.timestamp.getTime() + 60 * 60 * 1000 - Date.now()) / 1000);
        return res.status(429).json({ message: `Wait ${timeRemaining} seconds before claiming again.` });
    }

    // Store new claim
    await Claim.create({ ip, cookie });
    res.cookie("claimed", cookie, { maxAge: 60 * 60 * 1000, httpOnly: true });
    next();
}

export default preventAbuse;