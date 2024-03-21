import styles from "./TextArea.module.scss";
import type TextAreaProps from "./TextArea.props";

const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  placeholder,
  className,
  ...rest
}) => {
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
            className={`${
              styles.input_container
            } ${"border-grey30"} ${className}`}
          >
            <textarea
              className={`${styles.input}`}
              id={name}
              name={name}
              placeholder={placeholder}
              {...rest}
            ></textarea>
          </div>
        </>
      </>
    </div>
  );
};

export default TextArea;
