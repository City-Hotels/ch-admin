import { useField } from "formik";
import styles from "./AmountInput.module.scss";
import type AmountInputProps from "./AmountInput.props";
import { Label } from "@/components/Headings/Headings";

const AmountInput: React.FC<AmountInputProps> = ({
  label,
  name,
  placeholder,
  ...rest
}) => {
  const [field, meta] = useField({ name });

  return (
    <div>
      <div className="w-full text-left">
        <Label htmlFor={name} weight="bold" className={` ${styles.label}`}>
          {label}
        </Label>
      </div>
      <div className={styles.input_wrapper}>
        <span className={styles.input_prepend}></span>
        <input
          {...field}
          className={styles.inputs_no_border}
          id={name}
          name={name}
          placeholder={placeholder}
          {...rest}
        />
      </div>
      <>
        <div className={styles.meta}>
          {meta.touched && name && meta.error && meta.error}
        </div>
      </>
    </div>
  );
};

export default AmountInput;
