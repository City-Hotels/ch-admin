import React from "react";
import { H6, P2, P3 } from "@/components/Headings/Headings";
import type { IReviewOnGuest } from "@/services/review/payload";
import { convertGrpcDate } from "@/utils/helpers";
import dayjs from "dayjs";
import styles from "./GuestReview.module.scss";
// import Ratings from "../ratings/Ratings";

interface HostReviewItemProps {
  review: IReviewOnGuest;
}

const HostReviewItem: React.FC<HostReviewItemProps> = ({ review }) => {
  const date = review.Created_at
    ? dayjs(convertGrpcDate(review.Created_at)).format("DD MMMM YYYY")
    : "";
  return (
    <div className={styles.review_skeleton}>
      <H6 className="flex gap-4">
        {review.Rating.Overall.toFixed(1)}{" "}
        {/* <Ratings rating={review.Rating.Overall} /> */}
      </H6>
      <P2 className={styles.review_date}>{date}</P2>
      <P2 className={styles.review_content}>{review.Message}</P2>
      <P3 weight="bold" className={styles.review_author}>
        {review.Service.HostName}, {review.Service.Name}
      </P3>
    </div>
  );
};

export default HostReviewItem;
