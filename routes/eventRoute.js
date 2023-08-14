import express from "express"
import formidable from "express-formidable";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import { createEventController, deleteEventController, eventPhotoController, getEventController, getSingleEventController, updateEventController } from "../controller/eventController.js";

const router = express.Router();

//router
router.post('/create-event', requireSignIn, isAdmin, formidable(), createEventController);

//get all events
router.get('/get-event', getEventController);

//get single event
router.get('/get-single-event/:eid', getSingleEventController);

//get event photo
router.get('/get-event-photo/:eid', eventPhotoController);


//delete event
router.delete('/delete-event/:eid', requireSignIn, isAdmin, deleteEventController)


//update event
router.put('/update-event/:eid', requireSignIn, isAdmin, formidable(), updateEventController)


export default router; 