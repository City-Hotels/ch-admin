import { P2 } from "@/components/Headings/Headings";
import styles from "./Dropdown.module.scss";
import type { DropdownProps } from "./Dropdown.props";

const PriceDropdown: React.FC<DropdownProps> = ({
  className,
  options,
  choice,
  dropdownValue,
  onChange,
  width
}) => {
  return (
    <div className={`${styles.PriceContainer} ${className}`}>
      <div>
        <select
          className={`${styles.PriceSelect} ${width}`}
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

      <div className={styles.Tag}>
        <P2>{choice}</P2>
      </div>
    </div>
  );
};
export default PriceDropdown;
