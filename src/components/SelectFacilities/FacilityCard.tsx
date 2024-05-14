import { H4 } from "@/components/Headings/Headings";
import Img from "@/components/Image/Image";
import React from "react";
import styles from "./FacilityCard.module.scss";
import type FacilityCardProps from "./FacilityCard.props";

const FacilityCard: React.FC<FacilityCardProps> = ({
  Label,
  Icon,
  selected,
  onSelected
}) => {
  return (
    <div
      className={`${styles.FacilityContainer} ${selected && styles.SelectedFacilityContainer
        }`}
      onClick={() => onSelected && onSelected()}
    >
      {/* <Icon className={styles.Icon} /> */}
      <Img path={Icon} name={Label} className="size-10" />
      <H4 className={styles.Title}>{Label}</H4>
    </div>
  );
};

export default FacilityCard;
