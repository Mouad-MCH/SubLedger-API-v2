import { Router } from "express";
import { createTransaction, getAllTransactions, getTransaction } from "../controllers/transaction.Controller.js";
import { protect } from "../controllers/authController.js";

const router = Router();

router
  .post('/transactions', protect, createTransaction)  
  .get('/transactions', protect, getAllTransactions) 
  .get('/transactions/:id', protect, getTransaction); // Get a spcf trns

export default router;
