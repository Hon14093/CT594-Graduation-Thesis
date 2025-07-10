import express from 'express';
import {
    getCart,
    addToCart,
    removeFromCart,
    clearCart,
} from './controller.js'

const router = express.Router();

router.get('/:userId', getCart);
router.post('/:userId', addToCart);
router.delete('/:userId/:itemRefId', removeFromCart);
router.delete('/:userId', clearCart);

export default router;
