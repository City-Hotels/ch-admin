import { useState } from "react";
import EyeOpenIcon from "@/assets/icons/eye-open.svg";
import EyeOffIcon from "@/assets/icons/eye-off.svg";
import { useField } from "formik";
import type InputProps from "./Input.props";
import styles from "./Input.module.scss";

const Input: React.FC<InputProps> = ({
  label,
  name,
  placeholder,
  type,
  className,
  rightComponent,
  ...rest
}) => {
  const [field, meta] = useField({ name });

  const [mode, setMode] = useState("password");

  return (
    <div className="relative">
      {label && (
        <label htmlFor={name} className={` ${styles.label}`}>
          <div>{label}</div>
        </label>
      )}

      {type === "password" ? (
        <div
          className={`relative ${styles.input__container} ${
            meta.touched && meta.error ? "border-primary400" : "border-grey30"
          }  ${className}`}
        >
          <input
            {...field}
            className={`${styles.input}`}
            type={mode}
            id={name}
            name={name}
            placeholder={placeholder}
            {...rest}
          />
          <div className={styles.passwordContainer}>
            {mode === "password" ? (
              <EyeOpenIcon onClick={() => setMode("text")} />
            ) : (
              <EyeOffIcon onClick={() => setMode("password")} />
            )}
          </div>
        </div>
      ) : (
        <div
          className={`${styles.input__container} ${
            meta.touched && meta.error ? "border-primary400" : "border-grey30"
          } ${className}`}
        >
          <input
            {...field}
            className={`${styles.input}`}
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
            {...rest}
          />
          {rightComponent && rightComponent}
        </div>
      )}
      <>
        <div className="h-5 text-[10px] text-primary400">
          {meta.touched && name && meta.error && meta.error}
        </div>
      </>
    </div>
  );
};

export default Input;
