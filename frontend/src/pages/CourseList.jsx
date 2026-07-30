import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import styles from './CourseList.module.css';

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/courses')
      .then(res => setCourses(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-loader">Loading...</div>;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Courses</h1>

      {courses.length === 0 ? (
        <p className={styles.empty}>No courses available yet.</p>
      ) : (
        <div className={styles.grid}>
          {courses.map(course => (
            <Link to={`/courses/${course.id}`} key={course.id} className={styles.card}>
              <Card className={styles.cardInner}>
                <div className={styles.cardBody}>
                  <h2 className={styles.cardTitle}>{course.title}</h2>
                  <p className={styles.desc}>{course.description}</p>
                </div>
                <div className={styles.cardFooter}>
                  <Badge>{course.category}</Badge>
                  <span className={styles.instructor}>{course.instructor_name}</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
