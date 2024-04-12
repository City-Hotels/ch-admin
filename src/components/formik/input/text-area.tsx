import { useState } from "react";
import { useField } from "formik";
import styles from "./Input.module.scss";
import type InputProps from "./Input.props";

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

  return (
    <div className="relative">
      {label && (
        <label htmlFor={name} className={` ${styles.label}`}>
          <div>{label}</div>
        </label>
      )}
      <>
        {!["password", "amount"].includes(type || "") && (
          <>
            <div
              className={`${styles.input_container} ${
                meta.touched && meta.error
                  ? "border-primary400"
                  : "border-grey30"
              } ${className}`}
            >
              <textarea
                className={`${styles.input}`}
                id={name}
                {...field}
                name={name}
                placeholder={placeholder}
              />

              {rightComponent && rightComponent}
            </div>
          </>
        )}
        <>
          <div className="h-3 text-[10px] text-primary400">
            {meta.touched && name && meta.error && meta.error}
          </div>
        </>
      </>
    </div>
  );
};

export default Input;
