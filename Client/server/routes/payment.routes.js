import { Router } from "express";

import {
  createOrder,
  verifyPayment,
} from "../controllers/payment.controller.js";

const router = Router();

// Create a Razorpay order before opening checkout
router.post("/create-order", createOrder);

// Verify payment signature after checkout success
router.post("/verify", verifyPayment);

export default router;
