import match from "@/utils/match";
import styles from "./Heading.module.scss";

interface TextProps {
  weight?: "bold" | "regular";
}

export const H1: React.FC<JSX.IntrinsicElements["h1"]> = (props) => {
  return (
    <h1 {...props} className={`${styles.H1} ${props.className}`}>
      {props.children}
    </h1>
  );
};

export const H11: React.FC<JSX.IntrinsicElements["h1"]> = (props) => {
  return (
    <h1 {...props} className={`${styles.H11} ${props.className}`}>
      {props.children}
    </h1>
  );
};

export const H2: React.FC<JSX.IntrinsicElements["h2"]> = (props) => {
  return (
    <h2 {...props} className={`${styles.H2} ${props.className}`}>
      {props.children}
    </h2>
  );
};

export const H3: React.FC<JSX.IntrinsicElements["h3"]> = (props) => {
  return (
    <h3 {...props} className={`${styles.H3} ${props.className}`}>
      {props.children}
    </h3>
  );
};

export const H4: React.FC<JSX.IntrinsicElements["h4"]> = (props) => {
  return (
    <h4 {...props} className={`${styles.H4}  ${props.className}`}>
      {props.children}
    </h4>
  );
};

export const H44: React.FC<JSX.IntrinsicElements["h4"]> = (props) => {
  return (
    <h4
      {...props}
      className={`font-cal text-[18px] leading-[21,6px]  ${props.className}`}
    >
      {props.children}
    </h4>
  );
};

export const H5: React.FC<JSX.IntrinsicElements["h5"]> = (props) => {
  return (
    <h5 {...props} className={`${styles.H5} ${props.className}`}>
      {props.children}
    </h5>
  );
};

export const H6: React.FC<JSX.IntrinsicElements["h6"]> = (props) => {
  return (
    <h6 {...props} className={`${styles.H6} ${props.className}`}>
      {props.children}
    </h6>
  );
};

export const P: React.FC<JSX.IntrinsicElements["p"] & TextProps> = ({
  weight,
  ...props
}) => {
  const variant = match(weight || "regular", {
    bold: styles.P__Bold,
    regular: styles.P__Regular,
    default: "regular"
  });
  return (
    <p
      {...props}
      className={`
      ${variant} ${props.className}`}
    >
      {props.children}
    </p>
  );
};

export const P2: React.FC<JSX.IntrinsicElements["p"] & TextProps> = ({
  weight,
  ...props
}) => {
  const variant = match(weight || "regular", {
    bold: styles.P2__Bold,
    regular: styles.P2__Regular,
    default: "regular"
  });
  return (
    <p
      {...props}
      className={`
      ${variant} ${props.className}`}
    >
      {props.children}
    </p>
  );
};
export const P3: React.FC<JSX.IntrinsicElements["p"] & TextProps> = ({
  weight,
  ...props
}) => {
  const variant = match(weight || "regular", {
    bold: styles.P3__Bold,
    regular: styles.P3__Regular,
    default: "regular"
  });
  return (
    <p
      {...props}
      className={`
      ${variant} ${props.className}`}
    >
      {props.children}
    </p>
  );
};

export const Label: React.FC<JSX.IntrinsicElements["label"] & TextProps> = ({
  weight,
  ...props
}) => {
  const variant = match(weight || "regular", {
    bold: styles.Label__Bold,
    regular: styles.Label__Regular,
    default: "regular"
  });

  return (
    <label
      {...props}
      className={`
      ${variant} ${props.className}`}
    >
      {props.children}
    </label>
  );
};

export const Label1: React.FC<JSX.IntrinsicElements["label"]> = (props) => {
  return (
    <label {...props} className={`${styles.Label1} ${props.className}`}>
      {props.children}
    </label>
  );
};

export const Label2: React.FC<JSX.IntrinsicElements["label"]> = (props) => {
  return (
    <label {...props} className={`${styles.Label2} ${props.className}`}>
      {props.children}
    </label>
  );
};
