import express from 'express';
import { returnAllProducts } from './controllers.js';

const router = express.Router();

router.get('/all', returnAllProducts)

export default router;