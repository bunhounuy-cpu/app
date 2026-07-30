import * as dashboardService from '../services/dashboardService.js';
import { sendSuccess } from '../utils/responseHandler.js';

export const getStudentDashboard = async (req, res, next) => {
    try {
        const student_id = req.user.id;
        const stats = await dashboardService.getStudentDashboard(student_id);
        return sendSuccess(res, 200, "Student dashboard retrieved successfully", stats);
    } catch (error) {
        next(error);
    }
}

export const getInstructorDashboard = async (req, res, next) => {
    try {
        const instructor_id = req.user.id;
        const stats = await dashboardService.getInstructorDashboard(instructor_id);
        return sendSuccess(res, 200, "Instructor dashboard retrieved successfully", stats);
    } catch (error) {
        next(error);
    }
}

export const getAdminDashboard = async (req, res, next) => {
    try {
        const stats = await dashboardService.getAdminDashboard();
        return sendSuccess(res, 200, "Admin stats retrieved successfully", stats);
    } catch (error) {
        next(error);
    }
}
