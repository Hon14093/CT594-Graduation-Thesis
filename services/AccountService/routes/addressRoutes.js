import express from 'express';
import { createNewAddress, deleteAddress, editAddress, returnAddressById, returnAddressesByAccountId, returnAllAddresses } from '../controllers/addressController.js';

const router = express.Router();

router.get("/find/:account_id", returnAddressesByAccountId);
router.get("/find-address/:address_id", returnAddressById);
router.get("/all", returnAllAddresses);

router.post("/create", createNewAddress);

router.put("/update/:address_id", editAddress);

router.delete("/delete/:address_id", deleteAddress);

export default router;