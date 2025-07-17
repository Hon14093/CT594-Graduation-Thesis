import express from 'express'
import { returnAllOrders, returnOrderDetailsByOrderId, returnUnprocessedOrders } from '../controllers/orderController.js';

const router = express.Router();

// router.post('/order/confirm/:orderId', confirmOrder);

router.get('/all', returnAllOrders);
router.get('/unprocessed', returnUnprocessedOrders);

router.get('/details/all/:order_id', returnOrderDetailsByOrderId);

export default router;