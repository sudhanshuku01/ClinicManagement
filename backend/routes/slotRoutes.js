import express from "express";
import Slot from "../models/Slot.js";
import Booking from "../models/Booking.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get available slots
router.get("/slots", authMiddleware(["patient", "admin"]), async (req, res) => {
  try {
    const { from, to } = req.query;
    const bookedSlots = await Booking.find().select("slot");
    const bookedIds = bookedSlots.map((b) => b.slot.toString());

    const slots = await Slot.find({
      startAt: { $gte: new Date(from), $lte: new Date(to) },
    });

    const available = slots.filter(
      (slot) => !bookedIds.includes(slot._id.toString())
    );
    res.json(available);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
