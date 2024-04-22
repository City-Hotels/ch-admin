import Cancel from "@/assets/icons/cancel.svg";
import type {
  IReview,
  IReviewStatisticsPayload
} from "@/services/review/payload";
import React from "react";
import GuestReviewItem from "./GuestReviewItem";
// import HotelReviewsProgress from "./HotelReviews";
import styles from "./GuestReview.module.scss";
import ReviewStatistics from "./ReviewStatistics";

interface ReviewModalProps {
  onClose?: Function;
  reviews: IReview[];
  reviewStats?: IReviewStatisticsPayload;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  onClose,
  reviews,
  reviewStats
}) => {
  const handleCloseModal = () => {
    if (onClose) onClose();
  };

  return (
    <div className={styles.modal_content}>
      <div
        className=" absolute -right-4 -top-8 cursor-pointer"
        onClick={handleCloseModal}
      >
        <Cancel />
      </div>
      <div className={styles.review_container}>
        <div className={styles.review_header}>
          {/* {reviewStats && <HotelReviewsProgress reviews={reviewStats} />} */}
          {reviewStats && <ReviewStatistics reviews={reviewStats} />}
        </div>

        <div className={styles.review_base}>
          {reviews.map((review) => (
            <GuestReviewItem
              review={review}
              key={`review${review.BookingId}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
