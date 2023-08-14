import express from 'express'
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
import { createEventsController, deleteEventController, eventPhotoController, getEventController, getSingleEventController, updateEventController } from '../controller/eventsController.js';
import formidable from 'express-formidable'

const router = express.Router()

router.post('/create-events', requireSignIn, isAdmin, formidable(), createEventsController);

router.get('/get-event', getEventController)

router.get('/get-event-photo/:eid', eventPhotoController);

//get single event
router.get('/get-single-event/:eid', getSingleEventController);


//delete event
router.delete('/delete-event/:eid', requireSignIn, isAdmin, deleteEventController)


//update event
router.put('/update-event/:eid', requireSignIn, isAdmin, formidable(), updateEventController)

export default router; 