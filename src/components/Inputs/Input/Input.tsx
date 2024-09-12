"use client"
import { useState } from "react";
import EyeOpenIcon from "@/assets/icons/eye-open.svg";
import EyeOffIcon from "@/assets/icons/eye-off.svg";
import styles from "./Input.module.scss";
import type InputProps from "./Input.props";
import AmountInput from "./AmountInput";
import SearchIcon from "@/assets/icons/search.svg";

const Input: React.FC<InputProps> = ({
  label,
  name,
  placeholder,
  type,
  className,
  rightComponent,
  title,
  ...rest
}) => {
  const [mode, setMode] = useState("password");

  return (
    <div className="relative">
      {label && (
        <label htmlFor={name} className={` ${styles.label}`}>
          <div>{label}</div>
        </label>
      )}

      {type === "password" && (
        <div className={`relative ${styles.input_container} ${className}`}>
          <input
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
      )}
      {type === "amount" && (
        <div className={`${styles.input_container} ${className}`}>
          <AmountInput
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
      {!["amount", "password"].includes(type || "") && (
        <div className={`${styles.input_container} ${className}`}>
          <SearchIcon />

          <input
            className={`${styles.input}`}
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
            title={title}
            {...rest}
          />
          {rightComponent && rightComponent}
        </div>
      )}
    </div>
  );
};

export default Input;
