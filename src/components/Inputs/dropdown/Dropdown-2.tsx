// import { FaChevronDown } from "react-icons/fa";
import styles from "./Dropdown.module.scss";
import type { DropdownProps } from "./Dropdown.props";
import { Label1 } from "@/components/Headings/Headings";

const Dropdown: React.FC<DropdownProps> = ({
  choice,
  className,
  options,
  dropdownValue,
  onChange
}) => {
  return (
    <div className={`${styles.Container} ${className}`}>
      <div>
        <Label1 className="text-white900">{choice}</Label1>
        <select
          className={`${styles.Select}`}
          value={dropdownValue}
          onChange={onChange}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.select__caret__2}>
        {/* <FaChevronDown className="h-6 w-6" /> */}
      </div>
    </div>
  );
};
export default Dropdown;
