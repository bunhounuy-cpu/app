import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import styles from './CourseForm.module.css';

export default function CreateCourse() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '', category: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await api.post('/courses', form, { auth: true });
      navigate('/instructor/courses');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>New Course</h1>
      <Card className={styles.card}>
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <Alert variant="error">{error}</Alert>}

          <Input label="Title" name="title" placeholder="Course title" value={form.title} onChange={handleChange} required />
          <Input label="Category" name="category" placeholder="e.g. Programming, Design, Math" value={form.category} onChange={handleChange} required />
          <Input label="Description" name="description" tag="textarea" placeholder="Describe what this course covers..." value={form.description} onChange={handleChange} required />

          <div className={styles.actions}>
            <Button type="submit" disabled={busy}>{busy ? 'Creating...' : 'Create course'}</Button>
            <Button type="button" variant="secondary" onClick={() => navigate('/instructor/courses')}>Cancel</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
