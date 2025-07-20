import express from "express";
import { returnAccountInfo, returnAllAccounts } from "../controllers/accountController.js";

const router = express.Router();

router.get('/all', returnAllAccounts);
router.get('/find/:account_id', returnAccountInfo);

export default router;