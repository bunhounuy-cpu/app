import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import styles from './Dashboard.module.css';

export default function InstructorDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/dashboard/instructor', { auth: true })
      .then(res => setCourses(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-loader">Loading...</div>;

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Instructor Dashboard</h1>

      <Card className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Course</th>
              <th style={{ width: 140, textAlign: 'right' }}>Students</th>
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan={2} className={styles.tableEmpty}>No courses yet.</td>
              </tr>
            ) : (
              courses.map(c => (
                <tr key={c.id}>
                  <td>{c.title}</td>
                  <td style={{ textAlign: 'right', fontWeight: 600 }}>{c.total_students}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>

      <div className={styles.links}>
        <Link to="/instructor/courses"><Button>Manage courses</Button></Link>
      </div>
    </div>
  );
}
