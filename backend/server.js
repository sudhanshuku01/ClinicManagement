import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import slotRoutes from "./routes/slotRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import { generateSlots } from "./utils/generateSlots.js";
import Slot from "./models/Slot.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: [
      "https://mediibooker.netlify.app/",
      "https://www.mediibooker.netlify.app/",
    ],
    credentials: true,
  })
);
app.use(express.json());
//test Route

app.use("/test", (req, res) => {
  res.send("This is a test response from the /test route!");
});

// Routes
app.use("/api", authRoutes);
app.use("/api", slotRoutes);
app.use("/api", bookingRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");

    // Seed slots for next 7 days if empty
    const slotCount = await Slot.countDocuments();
    if (slotCount === 0) {
      const slots = generateSlots();
      await Slot.insertMany(slots);
      console.log("Slots generated for next 7 days");
    }

    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error(err));
