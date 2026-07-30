import db from '../config/db.js'

export const findEnrollment = async (student_id, course_id) => {
    const [rows] = await db.execute('SELECT * FROM enrollments WHERE student_id = ? AND course_id = ?', [student_id,course_id]);
    return rows[0];
}

export const createEnrollment = async (student_id, course_id) =>{
    const [result] = await db.execute('INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)', [student_id, course_id])
    return result.insertId;
}

export const getStudentCourses = async (student_id) =>{
    const [rows] = await db.execute('SELECT e.id AS enrollment_id, e.enrolled_at, c.id AS course_id, c.title, c.description, c.category, u.name AS instructor_name FROM enrollments e JOIN courses c ON e.course_id = c.id JOIN users u ON c.instructor_id = u.id WHERE e.student_id = ?', [student_id])
    return rows;
}

export const deleteEnrollment = async(student_id, course_id) => {
    const [result] = await db.execute('DELETE FROM enrollments WHERE student_id = ? AND course_id = ?', [student_id, course_id]);
    return result.affectedRows;
}