import React from "react";
import styles from "./ChatBookingSummary.module.scss";
import { H6, P, P2 } from "@/components/Headings/Headings";

const SkeletonChatBookingSummary = () => {
  return (
    <div className={`${styles.container}`}>
      <div className={styles.header}>
        <div className="">
          <div className="flex justify-between gap-2">
            <H6 className="w-[50px] animate-pulse bg-grey30 py-2"></H6>
            <div className={`${styles.link}`}>
              <P className="w-[50px] animate-pulse bg-grey30 py-2"></P>
            </div>
          </div>
          <div className={`${styles.host} mt-2 w-20 bg-green-100`} />
        </div>

        <div className={`${styles.link} block`}>
          <div className={`${styles.img} animate-pulse bg-grey100`} />
          <P2 className=" mt-3  w-[180px] animate-pulse bg-grey30 py-2"></P2>
        </div>

        <div className={styles.skeleton}>
          <div className=" text-white700">
            <P2 className="mt-3 w-[150px] animate-pulse bg-grey30 py-2"></P2>
            <P2 className="mt-3 w-[100px] animate-pulse bg-grey30 py-2"></P2>
            <P2 className="mt-3 w-[80px] animate-pulse bg-grey30 py-2"></P2>
          </div>
        </div>
        <div className={`h-[90px] ${styles.skeleton2}`} />
      </div>
    </div>
  );
};

export default SkeletonChatBookingSummary;
