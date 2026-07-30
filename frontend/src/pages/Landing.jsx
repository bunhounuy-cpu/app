import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import styles from './Landing.module.css';

export default function Landing() {
  const { user } = useAuth();

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.heading}>
          Course Management<br />System
        </h1>
        <p className={styles.sub}>
          A clean platform for students to enroll in courses, instructors to teach,
          and admins to oversee everything.
        </p>
        {!user && (
          <div className={styles.actions}>
            <Button href="/register" size="lg">Get started</Button>
            <Button href="/login" variant="secondary" size="lg">Log in</Button>
          </div>
        )}
        {user && (
          <div className={styles.actions}>
            <Button href="/courses" size="lg">Browse courses</Button>
          </div>
        )}
      </section>

      <div className={styles.grid}>
        <Card className={styles.card}>
          <h3 className={styles.cardTitle}>For Students</h3>
          <ul className={styles.list}>
            <li>Browse available courses</li>
            <li>Enroll and unenroll</li>
            <li>Track your enrollments</li>
            <li>Student dashboard</li>
          </ul>
        </Card>
        <Card className={styles.card}>
          <h3 className={styles.cardTitle}>For Instructors</h3>
          <ul className={styles.list}>
            <li>Create and manage courses</li>
            <li>Edit course content</li>
            <li>See enrolled students</li>
            <li>Instructor dashboard</li>
          </ul>
        </Card>
        <Card className={styles.card}>
          <h3 className={styles.cardTitle}>For Admins</h3>
          <ul className={styles.list}>
            <li>Manage all users</li>
            <li>Change user roles</li>
            <li>Remove users</li>
            <li>Global platform stats</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
