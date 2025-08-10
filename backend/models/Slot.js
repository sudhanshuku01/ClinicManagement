import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  startAt: { type: Date, required: true },
  endAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Slot", slotSchema);
