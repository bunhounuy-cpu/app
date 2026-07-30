import db from '../config/db.js'

export const totalEnrolledCourses = async (student_id) => {
    const [rows] = await db.execute('SELECT COUNT(*) AS totalEnrolled FROM enrollments WHERE student_id = ?', [student_id])

    return rows[0];
}

export const totalStudentsPerCourses = async (instructor_id) => {
    const [rows] = await db.execute('SELECT c.id, c.title, COUNT(e.id) AS total_students FROM courses c LEFT JOIN enrollments e ON c.id = e.course_id WHERE c.instructor_id = ? GROUP BY c.id;', [instructor_id])

    return rows
}

export const globalStats = async () => {
    const [rows] = await db.execute(`SELECT 
  (SELECT COUNT(*) FROM users WHERE role = 'student') AS totalStudents,
  (SELECT COUNT(*) FROM users WHERE role = 'instructor') AS totalInstructors,
  (SELECT COUNT(*) FROM courses) AS totalCourses,
  (SELECT COUNT(*) FROM enrollments) AS totalEnrollments;`)

  return rows[0];
}