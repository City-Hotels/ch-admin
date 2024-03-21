import { Label } from "../../headings/Headings";
import type InputProps from "./Input.props";
import styles from "./Input.module.scss";

const Input: React.FC<InputProps> = ({
  label,
  name,
  placeholder,
  append,
  ...rest
}) => {
  return (
    <div>
      <Label htmlFor={name} className="py-3">
        {label}
      </Label>
      <div className={styles.container}>
        <input
          className={styles.input_wrapper}
          id={name}
          name={name}
          placeholder={placeholder}
          {...rest}
        />
        {append && <span className={styles.input_prepend}>{append}</span>}
      </div>
    </div>
  );
};

export default Input;
