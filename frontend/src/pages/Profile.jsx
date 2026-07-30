import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import Badge from '../components/ui/Badge';
import styles from './Profile.module.css';

export default function Profile() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');
    setError('');
    setBusy(true);
    try {
      const res = await api.put('/users/profile', { name, email }, { auth: true });
      setMessage(res.msg);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={styles.page}>
      <Card className={styles.card}>
        <div className={styles.head}>
          <span className={styles.avatar}>{user?.name?.[0]}</span>
          <div>
            <h1 className={styles.title}>{user?.name}</h1>
            <div className={styles.meta}>
              <Badge variant="accent">{user?.role}</Badge>
              {user?.created_at && (
                <span className={styles.joined}>Joined {new Date(user.created_at).toLocaleDateString()}</span>
              )}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="error">{error}</Alert>}

          <Input label="Name" value={name} onChange={e => setName(e.target.value)} required />
          <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />

          <div className={styles.actions}>
            <Button type="submit" disabled={busy}>{busy ? 'Saving...' : 'Save changes'}</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
