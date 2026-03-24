import { Router } from "express";
import { createTransaction, getAllTransactions, getTransaction } from "../controllers/transaction.Controller.js";
import { protect } from "../controllers/authController.js";
import { verifyTransactionOwnership } from "../middlewares/ownershep.middleware.js";

const router = Router();


router
  .post('/transactions', protect, verifyTransactionOwnership, createTransaction)  
  .get('/transactions', protect, verifyTransactionOwnership, getAllTransactions) 
  .get('/transactions/:id', protect, verifyTransactionOwnership, getTransaction); // Get a spcf trns

export default router;
