import * as authService from '../services/authService.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';

export const register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return sendError(res, 400, "Name, email, and password are required");
        }

        const newUser = await authService.registerUser({ name, email, password, role });

        return sendSuccess(res, 201, "User registered successfully", newUser);
    } catch (error) {
        next(error); // Passes 409/500 errors to global errorHandler.js
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return sendError(res, 400, "Email and password are required");
        }

        const data = await authService.loginUser({ email, password });
        return sendSuccess(res, 200, "Login successful", data);
    } catch (error) {
        next(error);
    }
};

export const getMe = async (req, res, next) => {
    try {
        const user = await authService.getProfile(req.user.id);
        return sendSuccess(res, 200, 'User profile retrieved successfully', user)
    } catch (error){
        next(error)
    }
}