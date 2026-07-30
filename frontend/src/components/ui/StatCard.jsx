import Card from './Card';
import styles from './StatCard.module.css';

export default function StatCard({ value, label }) {
  return (
    <Card className={styles.stat}>
      <span className={styles.value}>{value}</span>
      <span className={styles.label}>{label}</span>
    </Card>
  );
}
