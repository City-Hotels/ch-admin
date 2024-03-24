import { useField } from "formik";
import { Label } from "../../headings/Headings";
import styles from "./DimensionInput.module.scss";
import type DimensionInputProps from "./DimensionInput.props";

const DimensionInput: React.FC<DimensionInputProps> = ({
  label,
  name,
  placeholder,
  className,
  type,
  ...rest
}) => {
  const [field, meta] = useField({ name });

  return (
    <div>
      <div className="w-full text-left">
        <Label weight="bold" htmlFor={name} className={`${styles.label}`}>
          {label}
        </Label>
      </div>
      <div className={`${styles.input_container} ${className}`}>
        <input
          {...field}
          className={`${styles.input}`}
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          {...rest}
        />

        <span className={styles.square_feet}> Square Feet </span>
      </div>
      <>
        <div className={styles.meta}>
          {meta.touched && name && meta.error && meta.error}
        </div>
      </>
    </div>
  );
};

export default DimensionInput;
