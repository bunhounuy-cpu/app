import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import StatCard from '../components/ui/StatCard';
import Button from '../components/ui/Button';
import styles from './Dashboard.module.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/dashboard/admin', { auth: true })
      .then(res => setStats(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-loader">Loading...</div>;

  const items = [
    { value: stats?.totalStudents ?? 0, label: 'Students' },
    { value: stats?.totalInstructors ?? 0, label: 'Instructors' },
    { value: stats?.totalCourses ?? 0, label: 'Courses' },
    { value: stats?.totalEnrollments ?? 0, label: 'Enrollments' },
  ];

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Admin Dashboard</h1>

      <div className={styles.statsGrid}>
        {items.map(item => (
          <StatCard key={item.label} value={item.value} label={item.label} />
        ))}
      </div>

      <div className={styles.links}>
        <Link to="/admin/users"><Button>Manage users</Button></Link>
      </div>
    </div>
  );
}
