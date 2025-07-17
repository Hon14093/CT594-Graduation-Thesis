import express from 'express';
import { createNewAddress, returnAddressById, returnAddressesByAccountId, returnAllAddresses } from '../controllers/addressController.js';

const router = express.Router();

router.get("/find/:account_id", returnAddressesByAccountId);
router.get("/find-address/:address_id", returnAddressById);
router.get("/all", returnAllAddresses);
router.post("/create", createNewAddress);

export default router;