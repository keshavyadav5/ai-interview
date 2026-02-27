import express from "express";
import isAuth from '../middlewares/isAuth.js';
import { createCheckoutSession, stripeWebhook } from "../controllers/payment.controller.js";

const router = express.Router();


router.post("/create-session", isAuth, createCheckoutSession);
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

export default router