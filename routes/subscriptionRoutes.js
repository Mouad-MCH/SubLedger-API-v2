import { Router } from "express";
import { cancelSubscription, createSubscription, deleteSubscription, getAllSubscriptions, getSubscription, updateSubscription } from "../controllers/subscriptionController.js";
import { protect } from "../controllers/authController.js";
import { verifySubscriptionOwnership } from "../middlewares/ownershep.middleware.js";
const router = Router();

router
  .post('/subscriptions/createSub', protect, createSubscription);

router
  .get('/subscriptions', protect, verifySubscriptionOwnership, getAllSubscriptions)
  .get('/subscriptions/:id', protect, verifySubscriptionOwnership, getSubscription)
  .put('/subscriptions/:id', protect, verifySubscriptionOwnership, updateSubscription)
  .delete('/subscriptions/:id', protect, verifySubscriptionOwnership, deleteSubscription)

router.patch('/cancel/:id', protect, verifySubscriptionOwnership, cancelSubscription)

export default router;