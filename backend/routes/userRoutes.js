import express from 'express';
import { createUser, loginUser, logoutUser, getAllUsers, getCurrentUserProfile, updateCurrentUserProfile, deleteUserById, getUserById, updateUserById, forgotPassword, resetPassword } from '../controllers/userController.js';
import { authenticate, authorizedAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router()

router.route('/').post(createUser).get(getAllUsers)

router.post('/auth', loginUser)
router.post('/logout', logoutUser)
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword/:token', resetPassword)

router.route('/profile').get(authenticate, getCurrentUserProfile).put(authenticate, updateCurrentUserProfile)

// ADMIN ROUTES
router.route('/:id').delete(authenticate, authorizedAdmin, deleteUserById).get(authenticate, authorizedAdmin, getUserById).put(authenticate, authorizedAdmin, updateUserById)



export default router