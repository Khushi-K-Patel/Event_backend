import express from "express"
import { requireSignIn, isAdmin } from "../middleware/authMiddleware.js";
import { forgotPasswordController, loginController, registerController, testController } from "../controller/authController.js";


//router object
const router = express.Router()

// routing 
// register
router.post('/register', registerController)

//login || post
router.post('/login', loginController)

//forgot password
router.post('/forgot-password', forgotPasswordController)

//test routes
router.get("/test", requireSignIn, isAdmin, testController);


export default router;
