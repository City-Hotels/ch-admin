import { useState } from "react";
import EyeOpenIcon from "@/assets/icons/eye-open.svg";
import EyeOffIcon from "@/assets/icons/eye-off.svg";
import { useField } from "formik";
import styles from "./Input.module.scss";
import type InputProps from "./Input.props";
import AmountInput from "../../inputs/input/AmountInput";

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
      <>
        {type === "password" && (
          <div
            className={`relative ${styles.input_container}  ${
              meta.touched && meta.error ? "border-primary400" : "border-grey30"
            } ${className}`}
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
            <div className={styles.password}>
              {mode === "password" ? (
                <EyeOpenIcon onClick={() => setMode("text")} />
              ) : (
                <EyeOffIcon onClick={() => setMode("password")} />
              )}
            </div>
          </div>
        )}
        {type === "amount" && (
          <>
            <div
              className={`${styles.input_container} ${
                meta.touched && meta.error
                  ? "border-primary400"
                  : "border-grey30"
              } ${className}`}
            >
              <AmountInput
                className={`${styles.input}`}
                type={type}
                id={name}
                {...field}
                name={name}
                placeholder={placeholder}
                {...rest}
              />

              {rightComponent && rightComponent}
            </div>
          </>
        )}
        {!["password", "amount"].includes(type || "") && (
          <>
            <div
              className={`${styles.input_container} ${
                meta.touched && meta.error
                  ? "border-primary400"
                  : "border-grey30"
              } ${className}`}
            >
              <input
                className={`${styles.input}`}
                type={type}
                id={name}
                {...field}
                name={name}
                placeholder={placeholder}
                {...rest}
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
