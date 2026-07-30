import * as courseModel from '../models/courseModel.js';

export const createCourse = async ({ title, description, category, instructor_id }) => {
    if (!title || !description || !category) {
        const error = new Error('title, description, and category are required');
        error.statusCode = 400;
        throw error;
    }

    const courseId = await courseModel.createCourse({ title, description, category, instructor_id });
    return { id: courseId, title, description, category, instructor_id };
};

export const getAllCourses = async () => {
    const courses = await courseModel.getAllCourses();
    return courses;
};

export const getCourseById = async (id) => {
    const course = await courseModel.getCourseById(id);
    if (!course) {
        const error = new Error('Course not found');
        error.statusCode = 404;
        throw error;
    }
    return course;
};

export const updateCourse = async (id, userId, updateData) => {
    const { title, description, category } = updateData;
    if (!title || !description || !category) {
        const error = new Error('title, description, and category are required');
        error.statusCode = 400;
        throw error;
    }

    const course = await courseModel.getCourseById(id);
    if (!course) {
        const error = new Error('Course not found');
        error.statusCode = 404;
        throw error;
    }
    if (course.instructor_id !== userId) {
        const error = new Error('Forbidden: You do not own this course');
        error.statusCode = 403;
        throw error;
    }

    const updated = await courseModel.updateCourse(id, { title, description, category });
    if (!updated) {
        const error = new Error('Course could not be updated');
        error.statusCode = 400;
        throw error;
    }
};

export const deleteCourse = async (id, userId) => {
    const course = await courseModel.getCourseById(id);
    if (!course) {
        const error = new Error('Course not found');
        error.statusCode = 404;
        throw error;
    }
    if (course.instructor_id !== userId) {
        const error = new Error('Forbidden: You do not own this course');
        error.statusCode = 403;
        throw error;
    }

    const deleted = await courseModel.deleteCourse(id);
    if (!deleted) {
        const error = new Error('Course could not be deleted');
        error.statusCode = 400;
        throw error;
    }
};
