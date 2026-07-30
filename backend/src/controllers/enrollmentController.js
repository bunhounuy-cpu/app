import * as enrollmentService from '../services/enrollmentService.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';

export const enrollCourse = async (req, res, next) => {
    try {
        const { courseId } = req.body;
        const student_id = req.user.id;

        if (!courseId)
            return sendError(res, 400, 'course_id is required.')

        await enrollmentService.enrollCourse(student_id, courseId);
        return sendSuccess(res, 201, 'Enrolled successfully.')
    } catch (error) {
        next(error);
    }
}

export const getMyCourses = async (req, res, next) => {
    try {
        const student_id = req.user.id;
        const courses = await enrollmentService.getMyCourses(student_id);
        return sendSuccess(res, 200, 'Success', courses);
    } catch (error) {
        next(error);
    }
}

export const unenrollCourse = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const student_id = req.user.id;

        await enrollmentService.unenrollCourse(student_id, courseId);
        return sendSuccess(res, 200, 'Unenrolled successfully.')
    } catch (error) {
        next(error);
    }
}
