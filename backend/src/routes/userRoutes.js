import express from 'express';
import { 
    getProfile, 
    getAllUsers, 
    updateProfile, 
    deleteUser,
    updateUserRole
} from '../controllers/userController.js';
import { verifyToken as authenticate } from '../middleware/authMiddleware.js';
import  authorize  from '../middleware/roleMiddleware.js';

const route = express.Router();

// All user routes require authentication
route.use(authenticate);

// Profile endpoints (Logged-in User)
route.get('/profile', getProfile);
route.put('/profile', updateProfile);

// Management endpoints (Admin Only)
route.get('/', authorize('admin'), getAllUsers);
route.delete('/:id', authorize('admin'), deleteUser);
route.patch('/:id/role', authorize('admin'), updateUserRole); 


export default route;