import express from 'express'
import { returnAllOrders, returnCompletedOrders, returnOrderDetailsByOrderId, returnOrdersByAccountId, returnProcessedOrders, returnRejectedOrders, returnUnprocessedOrders, updateStatus } from '../controllers/orderController.js';

const router = express.Router();

// router.post('/order/confirm/:orderId', confirmOrder);

router.get('/all', returnAllOrders);
router.get('/unprocessed', returnUnprocessedOrders);
router.get('/processed', returnProcessedOrders);
router.get('/rejected', returnRejectedOrders);
router.get('/my-orders/:account_id', returnOrdersByAccountId);
router.get('/completd/', returnCompletedOrders);

router.get('/details/all/:order_id', returnOrderDetailsByOrderId);

router.put('/check/:order_id', updateStatus);

export default router;