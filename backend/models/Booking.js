import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  slot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Slot",
    required: true,
    unique: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Booking", bookingSchema);
