import express from 'express'
import  { createCourse, deleteCourse, getAllCourses, getCourseById, updateCourse } from '../controllers/courseController.js';
import {verifyToken} from '../middleware/authMiddleware.js';
import authorizeRoles from '../middleware/roleMiddleware.js';

const route = express.Router();

route.get('/', getAllCourses);
route.get('/:id', getCourseById);

route.post('/', verifyToken, authorizeRoles('instructor'), createCourse)
route.put('/:id', verifyToken, authorizeRoles('instructor'), updateCourse)
route.delete('/:id', verifyToken, authorizeRoles('instructor'), deleteCourse)

export default route;