import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', paddingTop: 80 }}>
      <h1 style={{ fontSize: 56, fontWeight: 700, margin: '0 0 8px', color: 'var(--gray-900)', letterSpacing: '-2px' }}>
        404
      </h1>
      <p style={{ color: 'var(--gray-400)', marginBottom: 24 }}>Page not found.</p>
      <Link to="/"><Button>Go home</Button></Link>
    </div>
  );
}
