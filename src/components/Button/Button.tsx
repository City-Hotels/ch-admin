import type { FC, PropsWithChildren } from "react";
import styles from "./Button.module.scss";
import type ButtonProps from "./Button.props";
import match from "@/utils/match";

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  size = "",
  color = "primary",
  variant = "",
  children,
  className,
  isLoading,
  ...rest
}) => {
  const buttonSize = match(size, {
    sm: styles.size__small,
    md: styles.size__md,
    lg: styles.size__lg,
    default: ""
  });

  const buttonVariant = match(variant, {
    round: styles.variant__round,
    text: styles.variant__text,
    outline: styles.variant__outline,
    default: ""
  });

  const buttonColor = match(color, {
    primary: styles.color__primary,
    secondary: styles.color__secondary,
    muted: styles.color__muted,
    neutral: styles.color__neutral,
    danger: styles.color__danger,
    media: styles.color__media,
    tertiary: styles.color__tertiary,
    outline: styles.color__outline,
    black: styles.color__black,
    "outline-dark": styles.color__outline__dark,
    text: styles.color__text,
    "text-dark": styles.color__text__dark,
    "text-danger": styles.color__text__danger,
    default: ""
  });

  return (
    <button
      aria-label={rest.title}
      className={`
      ${styles.base}
      ${buttonVariant}
      ${buttonSize}
      ${buttonColor} ${className} 
    
    `}
      {...rest}
    >
      <>{isLoading ? "loading" : children}</>
    </button>
  );
};

export default Button;
