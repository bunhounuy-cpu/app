import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import styles from './MyCourses.module.css';

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/enrollments/my-courses', { auth: true })
      .then(res => setCourses(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleUnenroll(courseId) {
    if (!confirm('Unenroll from this course?')) return;
    try {
      await api.delete(`/enrollments/${courseId}`, { auth: true });
      setCourses(prev => prev.filter(c => c.course_id !== courseId));
    } catch (err) {
      alert(err.message);
    }
  }

  if (loading) return <div className="page-loader">Loading...</div>;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Enrolled Courses</h1>
        <Link to="/courses" className={styles.browseLink}>Browse courses &rarr;</Link>
      </div>

      {courses.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>You&apos;re not enrolled in any courses yet.</p>
          <Link to="/courses">
            <Button variant="secondary">Browse available courses</Button>
          </Link>
        </div>
      ) : (
        <div className={styles.list}>
          {courses.map(course => (
            <Card key={course.enrollment_id} className={styles.course}>
              <div className={styles.courseBody}>
                <h2 className={styles.courseTitle}>{course.title}</h2>
                <p className={styles.courseDesc}>{course.description}</p>
                <div className={styles.courseFooter}>
                  <Badge>{course.category}</Badge>
                  <span className={styles.instructor}>{course.instructor_name}</span>
                </div>
              </div>
              <Button onClick={() => handleUnenroll(course.course_id)} variant="danger" size="sm">Unenroll</Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
