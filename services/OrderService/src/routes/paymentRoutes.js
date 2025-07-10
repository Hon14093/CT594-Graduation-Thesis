import express from 'express';
import { createCheckoutSession, getSession } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/stripe/create-checkout-session', createCheckoutSession);
router.get('/stripe/session/:sessionId', getSession);

export default router;
