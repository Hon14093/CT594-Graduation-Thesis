import express from 'express';
import { createNewAddress, returnAddressesByAccountId } from '../controllers/addressController.js';

const router = express.Router();

router.get("/find/:account_id", returnAddressesByAccountId);
router.post("/create", createNewAddress);

export default router;