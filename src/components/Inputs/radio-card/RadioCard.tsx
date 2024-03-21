import React from "react";
import type RadioCardProps from "@/components/shared/inputs/radio-card/RadioCard.props";
import { H4, P2 } from "@/components/shared/headings/Headings";
import styles from "./RadioCard.module.scss";
import Radio from "../radio/Radio";

const RadioCard: React.FC<RadioCardProps> = ({
  onSelect,
  label,
  description,
  value,
  checked
}) => {
  return (
    <div className={`${styles.Container}`}>
      <Radio
        label=""
        value={value}
        name={"paymentoption"}
        onChange={(e) => {
          if (e.target.checked) {
            onSelect(value);
          }
        }}
        className={`${styles.radio}`}
        checked={checked}
      />
      <div>
        <H4>{label}</H4>
        <P2 className="mt-[10px] text-white900">{description}</P2>
      </div>
    </div>
  );
};

export default RadioCard;
