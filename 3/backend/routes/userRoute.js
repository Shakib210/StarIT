import express from 'express'
import {authUser,registerUser,getUserProfile,updateUserProfile, deleteUser} from '../controller/userController.js'

import { BDnumber,protect,librarian } from '../middleware/userMiddleware.js'

const router = express.Router();
router.route('/').post(BDnumber,registerUser)
router.route('/login').post(authUser);

router.route('/:phone').get(protect, getUserProfile)
  
router.route('/:id').delete(protect,librarian,deleteUser).put(protect, updateUserProfile)


export default router;
