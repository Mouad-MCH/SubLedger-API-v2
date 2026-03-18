import { Router } from "express";
import { login, signup } from "../controllers/authController.js";
import { protect } from "../controllers/authController.js";
import { restrictTo } from "../middlewares/roleMiddleware.js";
import { getAllUsers } from "../controllers/userController.js";
import {getStats} from "../controllers/userController.js"
const router = Router();

//for user
router 
  .post('/signup', signup)
  .post('/login', login);
  
//for admin
router
  .get('/', protect, restrictTo('admin'), getAllUsers)
  .get('/stats', protect, restrictTo('admin'), getStats)

export default router
