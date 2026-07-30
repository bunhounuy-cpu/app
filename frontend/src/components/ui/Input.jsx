import styles from './Input.module.css';

export default function Input({ label, error, ...props }) {
  return (
    <label className={styles.wrap}>
      {label && <span className={styles.label}>{label}</span>}
      {props.tag === 'textarea' ? (
        <textarea className={`${styles.input} ${styles.textarea} ${error ? styles.hasError : ''}`} {...props} />
      ) : props.tag === 'select' ? (
        <select className={`${styles.input} ${error ? styles.hasError : ''}`} {...props} />
      ) : (
        <input className={`${styles.input} ${error ? styles.hasError : ''}`} {...props} />
      )}
      {error && <span className={styles.error}>{error}</span>}
    </label>
  );
}
