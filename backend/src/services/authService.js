import bcrypt from 'bcryptjs';
import * as userModel from '../models/userModel.js';
import generateToken  from '../utils/generateToken.js';

/**
 * Register a new user
 * @param {Object} userData - { name, email, password, role }
 * @returns {Object} User details and JWT token
 */
export const registerUser = async ({ name, email, password, role = 'student' }) => {

    if(role === 'admin') {
        const error = new Error("Admin registration not allowed through this endpoint");
        error.statusCode = 403;
        throw error;
    }

    const standardRoles = ['student', 'instructor'];
    const assignedRole = standardRoles.includes(role) ? role : 'student';

    // 1. Check if user already exists
    const existingUser = await userModel.getUserByEmail(email);
    if (existingUser) {
        const error = new Error("User with this email already exists");
        error.statusCode = 409; // Conflict
        throw error;
    }

    // 2. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create user in database
    const newUserId = await userModel.createUser({
        name,
        email,
        password: hashedPassword,
        role: assignedRole
    });

    // 4. Fetch created user data (without password)
    const user = await userModel.getUserById(newUserId);

    // 5. Generate JWT Token
    const token = generateToken({ id: user.id, role: user.role });

    return { user, token };
};

/**
 * Authenticate user & generate token
 * @param {Object} credentials - { email, password }
 * @returns {Object} User details and JWT token
 */
export const loginUser = async ({ email, password }) => {
    // 1. Find user by email (must include password field for verification)
    const user = await userModel.getUserByEmailWithPassword(email);
    if (!user) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401; // Unauthorized
        throw error;
    }

    // 2. Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401; // Unauthorized
        throw error;
    }

    // 3. Clean up user object (remove sensitive password before returning)
    const { password: _, ...userWithoutPassword } = user;

    // 4. Generate JWT Token
    const token = generateToken({ id: user.id, role: user.role });

    return { user: userWithoutPassword, token };
};

export const getProfile = async (userId) => {
    const user = await userModel.getUserById(userId);
    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }
    return user;
};