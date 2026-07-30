import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import styles from './InstructorCourses.module.css';

export default function InstructorCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/courses')
      .then(res => {
        const userId = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id;
        setCourses(res.data.filter(c => c.instructor_id === userId));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id) {
    if (!confirm('Delete this course?')) return;
    try {
      await api.delete(`/courses/${id}`, { auth: true });
      setCourses(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  if (loading) return <div className="page-loader">Loading...</div>;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Courses</h1>
        <Button onClick={() => navigate('/instructor/courses/new')}>+ New Course</Button>
      </div>

      {courses.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>You haven&apos;t created any courses yet.</p>
          <Button onClick={() => navigate('/instructor/courses/new')} variant="secondary">Create your first course</Button>
        </div>
      ) : (
        <div className={styles.list}>
          {courses.map(course => (
            <Card key={course.id} className={styles.row}>
              <div className={styles.rowBody}>
                <h2 className={styles.rowTitle}>{course.title}</h2>
                <Badge>{course.category}</Badge>
              </div>
              <div className={styles.rowActions}>
                <Button onClick={() => navigate(`/instructor/courses/${course.id}/edit`)} variant="secondary" size="sm">Edit</Button>
                <Button onClick={() => handleDelete(course.id)} variant="danger" size="sm">Delete</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
