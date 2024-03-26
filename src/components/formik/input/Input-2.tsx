import { useField } from "formik";
import type InputProps from "./Input.props";
import styles from "./Input.module.scss";

const Input: React.FC<InputProps> = ({
  name,
  placeholder,
  type,
  className,
  ...rest
}) => {
  const [field, meta] = useField({ name });

  return (
    <div className="relative">
      <div className={`${styles.input_container_2} ${className}`}>
        <input
          {...field}
          className={`${styles.input}`}
          type={type}
          id={name}
          {...rest}
          name={name}
          placeholder={placeholder}
        />
        <>
          <div className="h-5 text-[10px] text-primary400">
            {meta.touched && name && meta.error && meta.error}
          </div>
        </>
      </div>
    </div>
  );
};

export default Input;
