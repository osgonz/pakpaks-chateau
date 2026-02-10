import express from 'express';
import authController from '../controllers/auth';
import { requireAuth } from '../middleware/auth';

const router = express.Router({mergeParams: true});

// POST route to authenticate user with a Google account 
router.post('/google', authController.authenticateUser);

// GET route to retrieve authenticated user's details
router.get('/me', requireAuth, authController.getAuthenticatedUser);

// POST route to log out user and clear cookie
router.post('/logout', requireAuth, authController.logOutUser);

export default router;