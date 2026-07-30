import * as courseService from '../services/courseService.js';
import { sendSuccess } from '../utils/responseHandler.js';

export const createCourse = async (req, res, next) => {
  try {
    const { title, description, category } = req.body;
    const instructor_id = req.user.id;
    const course = await courseService.createCourse({ title, description, category, instructor_id });
    return sendSuccess(res, 201, 'Course created successfully', course);
  } catch (error) {
    next(error);
  }
};

export const getAllCourses = async (req, res, next) => {
  try {
    const courses = await courseService.getAllCourses();
    return sendSuccess(res, 200, 'Success', courses);
  } catch (error) {
    next(error);
  }
};

export const getCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await courseService.getCourseById(id);
    return sendSuccess(res, 200, 'Success', course);
  } catch (error) {
    next(error);
  }
};

export const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, category } = req.body;
    await courseService.updateCourse(id, req.user.id, { title, description, category });
    return sendSuccess(res, 200, 'Course updated successfully.');
  } catch (error) {
    next(error);
  }
};

export const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    await courseService.deleteCourse(id, req.user.id);
    return sendSuccess(res, 200, 'Course deleted successfully.');
  } catch (error) {
    next(error);
  }
};
