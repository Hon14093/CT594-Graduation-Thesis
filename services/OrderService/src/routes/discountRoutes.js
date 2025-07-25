import express from 'express'
import { addDiscount, editDiscount, findDiscountByCode, removeDiscount, returnAllDiscounts } from '../controllers/discountController.js';

const router = express.Router();

router.get('/all', returnAllDiscounts);
router.get('/find/:discount_id', findDiscountByCode);

router.post('/create', addDiscount);

router.put('/update/:discount_id', editDiscount);

router.delete('/delete/:discount_id', removeDiscount)

export default router;