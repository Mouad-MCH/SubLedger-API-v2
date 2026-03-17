import { Router } from "express";
import { createSubscription, deleteSubscription, getAllSubscriptions, getSubscription, updateSubscription } from "../controllers/subscriptionController.js";
import { protect } from "../controllers/authController.js";
const router = Router();

router
  .post('/subscriptions/createSub', protect, createSubscription);

router
  .get('/subscriptions', protect, getAllSubscriptions)
  .get('/subscriptions/:id', protect, getSubscription)
  .put('/subscriptions/:id', protect, updateSubscription)
  .delete('/subscriptions/:id', protect, deleteSubscription)


export default router;