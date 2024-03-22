import type CheckboxProps from "./Checkbox.props";
import styles from "./Checkbox.module.scss";

const Checkbox = ({
  label,
  value,
  name,
  className,
  onChange
}: CheckboxProps) => {
  return (
    <div className={`${styles.check} ${className}`}>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={value}
        onChange={onChange}
        name={name || label}
      />
      <span className={`${styles.checkmark}`}></span>
      <label className={styles.label}>{label}</label>
    </div>
  );
};

export default Checkbox;
