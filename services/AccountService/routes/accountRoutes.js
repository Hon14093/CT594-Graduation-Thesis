import express from "express";
import { returnAllAccounts } from "../controllers/accountController.js";

const router = express.Router();

router.get('/all', returnAllAccounts);

export default router;