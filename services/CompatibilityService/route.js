import express from 'express';
import { compatibilityCheck } from './controller.js';

const router = express.Router();

router.get('/check/:laptop_id', compatibilityCheck);

export default router;