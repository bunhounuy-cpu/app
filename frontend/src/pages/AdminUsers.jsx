import { useState, useEffect } from 'react';
import { api } from '../api/client';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import styles from './AdminUsers.module.css';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  function loadUsers() {
    setLoading(true);
    api.get('/users', { auth: true })
      .then(res => setUsers(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }

  useEffect(() => { loadUsers() }, []);

  async function handleDelete(id) {
    if (!confirm('Delete this user? This cannot be undone.')) return;
    try {
      await api.delete(`/users/${id}`, { auth: true });
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleRoleChange(id, newRole) {
    try {
      const res = await api.patch(`/users/${id}/role`, { updateRole: newRole }, { auth: true });
      setUsers(prev => prev.map(u => u.id === id ? res.data : u));
    } catch (err) {
      alert(err.message);
    }
  }

  if (loading) return <div className="page-loader">Loading...</div>;

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>User Management</h1>

      <Card className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th style={{ width: 80 }}></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className={styles.name}>{user.name}</td>
                <td className={styles.email}>{user.email}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={e => handleRoleChange(user.id, e.target.value)}
                    className={styles.roleSelect}
                  >
                    <option value="student">student</option>
                    <option value="instructor">instructor</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td className={styles.date}>
                  {user.created_at ? new Date(user.created_at).toLocaleDateString() : '-'}
                </td>
                <td>
                  <Button onClick={() => handleDelete(user.id)} variant="danger" size="sm">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
