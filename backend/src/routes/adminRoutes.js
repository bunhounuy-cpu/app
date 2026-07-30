import express from 'express'
import {verifyToken} from '../middleware/authMiddleware.js';
import authorize from'../middleware/roleMiddleware.js';

const router = express.Router();
// Protected route: requires valid token AND admin role
router.get('/dashboard', verifyToken, authorize('admin'), (req, res) => {
  res.status(200).json({ message: 'Welcome to the Admin Dashboard!' });
});

export default router;

