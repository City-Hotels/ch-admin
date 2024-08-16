import styles from "./Input.module.scss";
import type InputProps from "./Input.props";

const Input: React.FC<InputProps> = ({
  name,
  placeholder,
  type,
  className,
  onChange
}) => {
  return (
    <div className="relative">
      <div className={`${styles.input_container_2} ${className}`}>
        <input
          className={`${styles.input}`}
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Input;
