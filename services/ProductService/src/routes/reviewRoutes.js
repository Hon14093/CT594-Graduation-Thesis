import express from 'express';
import { addReview, returnReviewsByProductId } from '../controllers/reviewController.js';

const router = express.Router();

router.post('/create', addReview);
router.get('/find/:product_id', returnReviewsByProductId);

export default router;