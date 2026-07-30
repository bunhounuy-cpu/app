import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import StatCard from '../components/ui/StatCard';
import Button from '../components/ui/Button';
import styles from './Dashboard.module.css';

export default function StudentDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/dashboard/student', { auth: true })
      .then(res => setStats(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-loader">Loading...</div>;

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Student Dashboard</h1>

      <div className={styles.statsGrid}>
        <StatCard value={stats?.totalEnrolled ?? 0} label="Enrolled Courses" />
      </div>

      <div className={styles.links}>
        <Link to="/courses"><Button>Browse courses</Button></Link>
        <Link to="/my-courses"><Button variant="secondary">My enrollments</Button></Link>
      </div>
    </div>
  );
}
