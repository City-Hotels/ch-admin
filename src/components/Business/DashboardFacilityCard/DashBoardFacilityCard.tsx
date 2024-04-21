import React from "react";
import Dot from "@/assets/icons/dots-vertical.svg";
import { P } from "@/components/Headings/Headings";
import type DashBoardFacilityCardProps from "./DashBoardFacilityCard.props";
import styles from "./DashBoardFacilityCard.module.scss";

const DashBoadFacilityCard: React.FC<DashBoardFacilityCardProps> = ({
  title,
  description,
  Icon
}) => {
  return (
    <div className={styles.DashBoardContainer}>
      <Dot className={styles.Dot} />
      <div>
        <div className={styles.Icon}>{Icon}</div>
        <P className={styles.Facility}>{title}</P>
      </div>
      <span className={styles.StatusContainer}>{description}</span>
    </div>
  );
};

export default DashBoadFacilityCard;
