import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import styles from './CourseForm.module.css';

export default function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '', category: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api.get(`/courses/${id}`)
      .then(res => {
        setForm({ title: res.data.title, description: res.data.description, category: res.data.category });
      })
      .catch(() => navigate('/instructor/courses'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await api.put(`/courses/${id}`, form, { auth: true });
      navigate('/instructor/courses');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  if (loading) return <div className="page-loader">Loading...</div>;

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Edit Course</h1>
      <Card className={styles.card}>
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <Alert variant="error">{error}</Alert>}

          <Input label="Title" name="title" value={form.title} onChange={handleChange} required />
          <Input label="Category" name="category" value={form.category} onChange={handleChange} required />
          <Input label="Description" name="description" tag="textarea" value={form.description} onChange={handleChange} required />

          <div className={styles.actions}>
            <Button type="submit" disabled={busy}>{busy ? 'Saving...' : 'Save changes'}</Button>
            <Button type="button" variant="secondary" onClick={() => navigate('/instructor/courses')}>Cancel</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
