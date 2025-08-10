import express from "express";
import Booking from "../models/Booking.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Book a slot
router.post("/book", authMiddleware(["patient"]), async (req, res) => {
  try {
    const { slotId } = req.body;

    const exists = await Booking.findOne({ slot: slotId });
    if (exists) {
      return res.status(400).json({
        error: { code: "SLOT_TAKEN", message: "Slot already booked" },
      });
    }

    const booking = new Booking({ user: req.user.id, slot: slotId });
    await booking.save();
    res.status(201).json({ message: "Slot booked" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// My bookings
router.get("/my-bookings", authMiddleware(["patient"]), async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate("slot");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// All bookings (Admin)
router.get("/all-bookings", authMiddleware(["admin"]), async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user").populate("slot");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
