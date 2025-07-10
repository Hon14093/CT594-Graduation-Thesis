import express from 'express'

const router = express.Router();

router.post('/order/confirm/:orderId', confirmOrder);

export default router;