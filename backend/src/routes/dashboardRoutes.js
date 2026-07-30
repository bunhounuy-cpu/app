import express from 'express'
import { getStudentDashboard, getInstructorDashboard, getAdminDashboard } from '../controllers/dashboardController.js';
import { verifyToken as authenticate } from '../middleware/authMiddleware.js';
import authorize  from '../middleware/roleMiddleware.js';
const route = express.Router()

route.get('/student', authenticate, authorize('student'), getStudentDashboard);

route.get('/instructor', authenticate, authorize('instructor'), getInstructorDashboard);

route.get('/admin', authenticate, authorize('admin'), getAdminDashboard);


export default route;