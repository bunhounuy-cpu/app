import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Badge from '../ui/Badge';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  const linkClass = ({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`;

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>CourseManager</Link>

        <nav className={styles.nav}>
          <NavLink to="/courses" className={linkClass}>Courses</NavLink>

          {user?.role === 'student' && (
            <>
              <NavLink to="/my-courses" className={linkClass}>My Courses</NavLink>
              <NavLink to="/dashboard/student" className={linkClass}>Dashboard</NavLink>
            </>
          )}

          {user?.role === 'instructor' && (
            <>
              <NavLink to="/instructor/courses" className={linkClass}>My Courses</NavLink>
              <NavLink to="/dashboard/instructor" className={linkClass}>Dashboard</NavLink>
            </>
          )}

          {user?.role === 'admin' && (
            <>
              <NavLink to="/admin/users" className={linkClass}>Users</NavLink>
              <NavLink to="/dashboard/admin" className={linkClass}>Dashboard</NavLink>
            </>
          )}
        </nav>

        <div className={styles.right}>
          {user ? (
            <>
              <Link to="/profile" className={styles.profile}>
                <span className={styles.avatar}>{user.name[0]}</span>
                <span className={styles.name}>{user.name}</span>
              </Link>
              <Badge variant="accent">{user.role}</Badge>
              <button onClick={handleLogout} className={styles.logout}>Log out</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>Log in</NavLink>
              <Link to="/register" className={styles.cta}>Get started</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
