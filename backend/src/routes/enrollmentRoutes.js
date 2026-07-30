import express from 'express'
import  * as enrollment from '../controllers/enrollmentController.js';
import {verifyToken} from '../middleware/authMiddleware.js';
import authorizeRoles from '../middleware/roleMiddleware.js';

const route = express.Router();

route.use(verifyToken, authorizeRoles('student'));

route.post('/', enrollment.enrollCourse);
route.get('/my-courses', enrollment.getMyCourses);
route.delete('/:courseId', enrollment.unenrollCourse)

export default route;