import db from '../config/db.js'

// Get user by email (for checking duplicates & public profile lookup)
export const getUserByEmail = async (email) => {
    const [rows] = await db.execute(
        'SELECT id, name, email, role, created_at FROM users WHERE email = ?',
        [email]
    );
    return rows[0];
};

// Get user by email including password hash (specifically for login comparison)
export const getUserByEmailWithPassword = async (email) => {
    const [rows] = await db.execute(
        'SELECT id, name, email, password, role FROM users WHERE email = ?',
        [email]
    );
    return rows[0];
};

// Insert a new user record
export const createUser = async ({ name, email, password, role }) => {
    const [result] = await db.execute(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, password, role]
    );
    return result.insertId; // Returns new MySQL user ID
};


// Get all users (for Admin dashboard / user management)
export const getAllUsers = async () => {
    const [rows] = await db.execute(
        'SELECT id, name, email, role, created_at FROM users'
    );
    return rows;
};

// Find user by ID (excludes password for security)
export const getUserById = async (id) => {
    const [rows] = await db.execute(
        'SELECT id, name, email, role, created_at FROM users WHERE id = ?',
        [id]
    );
    return rows[0]; // Return single user object
};

// Update user profile info
export const updateUser = async (id, { name, email }) => {
    await db.execute(
        'UPDATE users SET name = ?, email = ? WHERE id = ?',
        [name, email, id]
    );
    return getUserById(id);
};

// Delete user account (Admin feature)
export const deleteUser = async (id) => {
    const [result] = await db.execute('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows > 0;
};



export const findByIdAndUpdate = async (id, {role}) =>{
    await db.execute('UPDATE users SET role = ? WHERE id = ?', [role, id])

    return getUserById(id);
}