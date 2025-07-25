import express from "express";
import { AddAccount, deleteAccount, editAccountStatus, returnAccountInfo, returnAllAccounts, returnCustomerCount } from "../controllers/accountController.js";

const router = express.Router();

router.get('/all', returnAllAccounts);
router.get('/find/:account_id', returnAccountInfo);
router.get('/count', returnCustomerCount);

router.post('/create', AddAccount);

router.put('/update-status/:account_id', editAccountStatus);

router.delete('/delete/:account_id', deleteAccount)

export default router;