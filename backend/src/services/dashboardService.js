import * as dashboardModel from '../models/dashboardModel.js';

export const getStudentDashboard = async (student_id) => {
    if (!student_id) {
        const error = new Error('Unauthorized: Student ID missing from request token');
        error.statusCode = 401;
        throw error;
    }

    return await dashboardModel.totalEnrolledCourses(student_id);
};

export const getInstructorDashboard = async (instructor_id) => {
    if (!instructor_id) {
        const error = new Error('Unauthorized: Instructor ID missing from request token');
        error.statusCode = 401;
        throw error;
    }

    return await dashboardModel.totalStudentsPerCourses(instructor_id);
};

export const getAdminDashboard = async () => {
    return await dashboardModel.globalStats();
};
