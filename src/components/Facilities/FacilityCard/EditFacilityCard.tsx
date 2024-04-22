import React from "react";
import { H4 } from "@/components/Headings/Headings";
import Img from "@/components/Image/Image";
import type FacilityCardProps from "./FacilityCard.props";
import styles from "./EditFacilityCard.module.scss";

const EditFacilityCard: React.FC<FacilityCardProps> = ({
  Icon,
  selected,
  Label,
  onSelected
}) => {
  return (
    <div
      className={
        selected ? styles.SelectedFacilityContainer : styles.FacilityContainer
      }
      onClick={() => onSelected && onSelected()}
    >
      <Img path={Icon} name={Label} className="h-full" />
      <H4 className={styles.Title}>{Label}</H4>
    </div>
  );
};

export default EditFacilityCard;
