import styles from './Button.module.css';

export default function Button({ children, variant = 'primary', size = 'md', disabled, onClick, type = 'button', className = '', href }) {
  const cls = `${styles.btn} ${styles[variant]} ${styles[size]} ${className}`;

  if (href) {
    return <a href={href} className={cls}>{children}</a>;
  }

  return (
    <button type={type} className={cls} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
