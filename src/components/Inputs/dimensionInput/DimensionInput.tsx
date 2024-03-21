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
  return (
    <div>
      <Label htmlFor={name} className="py-3">
        {label}
      </Label>
      <div className={`${styles.input_container} ${className}`}>
        <input
          className={`${styles.input}`}
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          {...rest}
        />

        <span className={styles.squareFeet}> Square Feet </span>
      </div>
    </div>
  );
};

export default DimensionInput;
