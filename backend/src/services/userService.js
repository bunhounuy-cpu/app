import * as userModel from '../models/userModel.js';

export const getProfile = async (userId) => {
    const user = await userModel.getUserById(userId);
    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }
    return user;
};

export const getAllUsers = async () => {
    return await userModel.getAllUsers();
};

export const updateProfile = async (userId, { name, email }) => {
    if (!name || !email) {
        const error = new Error('Name and email are required fields');
        error.statusCode = 400;
        throw error;
    }

    const existingUser = await userModel.getUserByEmail(email);
    if (existingUser && existingUser.id !== userId) {
        const error = new Error('Email is already in use by another account');
        error.statusCode = 409;
        throw error;
    }

    const updatedUser = await userModel.updateUser(userId, { name, email });
    return updatedUser;
};

export const deleteUser = async (id) => {
    const isDeleted = await userModel.deleteUser(id);
    if (!isDeleted) {
        const error = new Error('User not found or already deleted');
        error.statusCode = 404;
        throw error;
    }
};

export const updateUserRole = async (id, updateRole) => {
    const validRoles = ['admin', 'instructor', 'student'];
    if (!validRoles.includes(updateRole)) {
        const error = new Error('Invalid role specified');
        error.statusCode = 400;
        throw error;
    }

    const updatedUser = await userModel.findByIdAndUpdate(id, { role: updateRole });
    if (!updatedUser) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }

    return updatedUser;
};
