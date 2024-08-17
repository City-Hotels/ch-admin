// import { Label, P, P2 } from "@/components/shared/headings/Headings";
// import ReactStars from "react-rating-stars-component";
import React, { useState } from "react";
import styles from "./SupportBookingSummary.module.scss";
import { Label, P, P2 } from "@/components/Headings/Headings";

const SupportBookingSummary = () => {
  const [rating, setRating] = useState<number>(0);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.container2}>
          <div className="mt-6">
            <P>Ticket Details</P>
            <div className={styles.label}>
              <Label className="">Marked as resolved</Label>
            </div>
          </div>
        </div>
        <div className={styles.header}>
          <div className={styles.skeleton}>
            <P>Review this conversation</P>
            <Label className="">
              We want to know if we solved your issues to your satisfaction{" "}
            </Label>

            <P2 className="mt-2" weight="bold">
              How would you rate this chat?
            </P2>

            <div className="">
              {/* <ReactStars
                count={5}
                value={rating}
                onChange={handleRatingChange}
                size={20}
                activeColor="#FE8501"
                classNames="flex gap-4"
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportBookingSummary;
