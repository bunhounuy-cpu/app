import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Alert from '../components/ui/Alert';
import styles from './CourseDetail.module.css';

export default function CourseDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [msgType, setMsgType] = useState('success');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api.get(`/courses/${id}`)
      .then(res => setCourse(res.data))
      .catch(() => navigate('/courses'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  async function handleEnroll() {
    setMessage('');
    setBusy(true);
    try {
      await api.post('/enrollments', { courseId: Number(id) }, { auth: true });
      setMessage('Successfully enrolled!');
      setMsgType('success');
    } catch (err) {
      setMessage(err.message);
      setMsgType('error');
    } finally {
      setBusy(false);
    }
  }

  if (loading) return <div className="page-loader">Loading...</div>;
  if (!course) return null;

  return (
    <div className={styles.page}>
      <button onClick={() => navigate('/courses')} className={styles.back}>
        &larr; Back to courses
      </button>

      <Card className={styles.card}>
        <h1 className={styles.title}>{course.title}</h1>

        <div className={styles.meta}>
          <Badge>{course.category}</Badge>
          <span className={styles.instructor}>by {course.instructor_name}</span>
        </div>

        <p className={styles.desc}>{course.description}</p>

        {message && (
          <Alert variant={msgType}><span style={{ fontWeight: 500 }}>{message}</span></Alert>
        )}

        {user?.role === 'student' && (
          <Button onClick={handleEnroll} disabled={busy} size="lg">
            {busy ? 'Enrolling...' : 'Enroll in this course'}
          </Button>
        )}
      </Card>
    </div>
  );
}
