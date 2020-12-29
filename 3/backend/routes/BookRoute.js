import express from 'express'
const router= express.Router()
import { createBook, deleteBook, getBookByName, updateBook } from '../controller/BookController.js'
import { librarian, protect } from '../middleware/userMiddleware.js'

router.route('/').post(protect,librarian,createBook)
router.route('/:name').get(getBookByName)


router.route('/:id').delete(protect,librarian,deleteBook).put(protect,librarian,updateBook)


export default router