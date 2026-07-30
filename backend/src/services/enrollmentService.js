import * as enrollmentModel from '../models/enrollmentModel.js';
import * as courseModel from '../models/courseModel.js';

export const enrollCourse = async (student_id, courseId) => {
    if (!courseId) {
        const error = new Error('course_id is required.');
        error.statusCode = 400;
        throw error;
    }

    const course = await courseModel.getCourseById(courseId);
    if (!course) {
        const error = new Error('Course not found.');
        error.statusCode = 404;
        throw error;
    }

    const existingEnrollment = await enrollmentModel.findEnrollment(student_id, courseId);
    if (existingEnrollment) {
        const error = new Error('You are already enrolled in this course.');
        error.statusCode = 409;
        throw error;
    }

    await enrollmentModel.createEnrollment(student_id, courseId);
};

export const getMyCourses = async (student_id) => {
    return await enrollmentModel.getStudentCourses(student_id);
};

export const unenrollCourse = async (student_id, courseId) => {
    if (!courseId) {
        const error = new Error('course_id is required.');
        error.statusCode = 400;
        throw error;
    }

    const affectedRows = await enrollmentModel.deleteEnrollment(student_id, courseId);
    if (affectedRows === 0) {
        const error = new Error('Enrollment record not found.');
        error.statusCode = 404;
        throw error;
    }
};
