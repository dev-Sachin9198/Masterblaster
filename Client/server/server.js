import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import paymentRoutes from "./routes/payment.routes.js";

dotenv.config();

const app = express();

// ==================================================
// Middleware
// ==================================================
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);

app.use(express.json());

// ==================================================
// Routes
// ==================================================
app.use("/api/payment", paymentRoutes);

app.get("/", (req, res) => {
  res.send("Movie Booking Payment Server is running");
});

// ==================================================
// Start Server
// ==================================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
