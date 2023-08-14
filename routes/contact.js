import express from "express"

import { contactController, getClientMessageController} from "../controller/contactController.js";
import { isAdmin, requireSignIn } from './../middleware/authMiddleware.js';


//router object
const router = express.Router()

// routing 
// contact
router.post('/contact', contactController)
router.get('/getContactInfo',requireSignIn,isAdmin,getClientMessageController);
export default router;