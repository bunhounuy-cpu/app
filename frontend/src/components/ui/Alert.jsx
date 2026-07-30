import styles from './Alert.module.css';

export default function Alert({ children, variant = 'info' }) {
  return <div className={`${styles.alert} ${styles[variant]}`}>{children}</div>;
}
