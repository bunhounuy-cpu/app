import * as userService from '../services/userService.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';

export const getProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return sendError(res, 401, "Unauthorized access");
        }

        const user = await userService.getProfile(userId);
        return sendSuccess(res, 200, "User profile retrieved successfully", user);
    } catch (error) {
        next(error);
    }
};

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        return sendSuccess(res, 200, "All users retrieved successfully", users);
    } catch (error) {
        next(error);
    }
};

export const updateProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { name, email } = req.body;

        const updatedUser = await userService.updateProfile(userId, { name, email });
        return sendSuccess(res, 200, "Profile updated successfully", updatedUser);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        await userService.deleteUser(id);
        return sendSuccess(res, 200, "User deleted successfully");
    } catch (error) {
        next(error);
    }
};

export const updateUserRole = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { updateRole } = req.body;

        const updatedUser = await userService.updateUserRole(id, updateRole);
        return sendSuccess(res, 200, "Role updated successfully", updatedUser);
    } catch (error) {
        next(error);
    }
};
