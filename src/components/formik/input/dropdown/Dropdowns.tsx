import { FaChevronDown } from "react-icons/fa";
import { useField } from "formik";
import { Label, Label1 } from "@/components/shared/headings/Headings";
import type { DropdownProps } from "./Dropdown.props";
import styles from "./Dropdown.module.scss";

const Dropdown: React.FC<DropdownProps> = ({
  choice,
  className,
  options,
  placeholder,
  onChange,
  label,
  name
}) => {
  const [field, meta] = useField({ name });
  return (
    <>
      <Label weight="bold">{label}</Label>
      <div className={`${styles.Container} ${className}`}>
        <div>
          <Label1 className="text-white900">{choice}</Label1>
          <select
            className={`${styles.Select}`}
            {...field}
            placeholder={placeholder}
            onBlur={onChange}
          >
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.select__caret__2}>
          <FaChevronDown className="h-4 w-4" />
        </div>
      </div>
      <div className="h-2 text-[10px] text-primary400">
        {meta.touched && name && meta.error && meta.error}
      </div>
    </>
  );
};
export default Dropdown;
