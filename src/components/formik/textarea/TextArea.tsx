import { useField } from "formik";
import styles from "./TextArea.module.scss";
import type TextAreaProps from "./TextArea.props";

const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  placeholder,
  className,
  ...rest
}) => {
  const [field, meta] = useField({ name });

  return (
    <div className="relative">
      {label && (
        <label htmlFor={name} className={` ${styles.label}`}>
          <div>{label}</div>
        </label>
      )}
      <>
        <>
          <div
            className={`${styles.input_container} ${
              meta.touched && meta.error ? "border-primary400" : "border-grey30"
            } ${className}`}
          >
            <textarea
              className={`${styles.input}`}
              id={name}
              {...field}
              name={name}
              placeholder={placeholder}
              {...rest}
            ></textarea>
          </div>
        </>

        <>
          <div className="h-5 text-[10px] text-primary400">
            {meta.touched && name && meta.error && meta.error}
          </div>
        </>
      </>
    </div>
  );
};

export default TextArea;
