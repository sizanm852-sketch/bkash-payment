import express from "express";
import type { Router } from "express";
import { createPayment, callbackPayment } from "./paymentController";
import VerifyPayment from "./middleware";

const router:Router = express.Router();

router.post('/payment/create/bkash', VerifyPayment, createPayment)
router.get('/payment/callback', callbackPayment)

export default router