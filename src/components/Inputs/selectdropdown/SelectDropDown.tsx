import Select from "react-select";
import styles from "./SelectDropDown.module.scss";
import type LocationDropDownProps from "./SelectDropDown.props";
import { P } from "../../headings/Headings";

const SelectDropDown: React.FC<LocationDropDownProps> = ({
  items,
  label,
  placeholder,
  Icon
}) => {
  return (
    <div className={`${styles.wrapper}`}>
      {Icon && <Icon className="w-[30px]" />}
      <div className={`${styles.dropdown}`}>
        <P className="mb-3 w-full text-start text-white900">{label}</P>
        <div className="flex items-center gap-[10px]">
          <Select
            classNamePrefix="select"
            className="h-[30px] bg-transparent px-0 text-start font-matter font-black text-black"
            defaultValue={items[0]}
            name="guest"
            options={items}
          />
        </div>
        <P className="mt-[10px] text-[#9D9D9D]">{placeholder}</P>
      </div>
    </div>
  );
};

export default SelectDropDown;
