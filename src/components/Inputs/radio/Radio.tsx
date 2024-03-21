import type RadioProps from "./Radio.props";
import styles from "./Radio.module.scss";

const Radio = ({ label, value, className, onChange, checked }: RadioProps) => {
  return (
    <div className={`${styles.check} ${className}`}>
      <label className={styles.container}>
        <input
          type="radio"
          name="radio"
          checked={checked}
          className={styles.input}
          value={value}
          onChange={(e) => {
            if (onChange) onChange(e);
          }}
        />
        <span
          className={`${styles.checkmark} ${checked ? styles.checked : ""}`}
        >
          {checked && <span className={styles.dot} />}
        </span>
      </label>
      <label className={styles.label}>{label}</label>
    </div>
  );
};

export default Radio;
