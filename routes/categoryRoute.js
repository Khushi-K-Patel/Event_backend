import express from 'express'
import { isAdmin, requireSignIn } from './../middleware/authMiddleware.js';
import { createCategoryController, deleteCategoryController, getAllCategoryController, singleCategoryController, updateCategoryController } from '../controller/categoryController.js';


const router = express.Router()

//routes
router.post('/create-category', requireSignIn, isAdmin, createCategoryController)

//update category
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController)


//get all category
router.get('/categories', getAllCategoryController)


//single category
router.get('/single-category/:slug', singleCategoryController)


//delete category
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController)

export default router