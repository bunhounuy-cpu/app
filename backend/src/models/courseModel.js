import db from '../config/db.js'

export const createCourse = async ({title, description, category, instructor_id}) => {
    const [result] = await db.execute('INSERT INTO courses (title, description, category, instructor_id) VALUES (?,?,?,?)', [title, description, category, instructor_id])
    return result.insertId;
}

export const getAllCourses = async () => {
    const [rows] = await db.execute('SELECT c.*, u.name AS instructor_name FROM courses c JOIN users u ON c.instructor_id = u.id')
    return rows;
}


// Get a single course by ID
export const getCourseById = async (id) => {
    const [rows] = await db.execute('SELECT c.*, u.name AS instructor_name FROM courses c JOIN users u ON c.instructor_id = u.id WHERE c.id = ?', [id])
    return rows.length > 0 ? rows[0] : null;
};

// Update a course
export const updateCourse = async (id, { title, description, category }) => {
    // TODO: UPDATE courses SET title = ?, description = ?, category = ? WHERE id = ?
    const [result] = await db.execute('UPDATE courses SET title = ?, description = ?, category = ? WHERE id = ?', [title, description, category, id])
    return result.affectedRows > 0;
};

// Delete a course
export const deleteCourse = async (id) => {
  // TODO: DELETE FROM courses WHERE id = ?
  const [result] = await db.execute('DELETE FROM courses WHERE id = ?', [id])
  return result.affectedRows > 0;
};


