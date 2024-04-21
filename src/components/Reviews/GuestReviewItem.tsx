import React from "react";
import { H5, H6, P2 } from "@/components/Headings/Headings";
import type { IReview } from "@/services/review/payload";
import { convertGrpcDate } from "@/utils/helpers";
import dayjs from "dayjs";
import styles from "./GuestReview.module.scss";

interface GuestReviewItemProps {
  review: IReview;
}

const GuestReviewItem: React.FC<GuestReviewItemProps> = ({ review }) => {
  const date = review.Created_at
    ? dayjs(convertGrpcDate(review.Created_at)).format("DD MMMM YYYY")
    : "";
  return (
    <div className={styles.review_skeleton}>
      <H5>{review?.Rating?.Overall}/10</H5>
      {date && <P2 className={styles.review_date}>{date}</P2>}
      <H6>{review.Title}</H6>
      <P2 className={styles.review_content}>{review.Message}</P2>
      <H6 className={styles.review_author}>{review.Guest.FullName}</H6>
    </div>
  );
};

export default GuestReviewItem;
