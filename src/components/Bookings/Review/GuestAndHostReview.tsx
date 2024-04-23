import { H6, P, P2 } from "@/components/Headings/Headings";
import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import styles from "./Reviews.module.scss";

const GuestAndHostReview = () => {
  const [rating, setRating] = useState<number>(0);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  return (
    <div className={styles.host_review_container}>
      <div className="ml-11 mt-10">
        <H6>Reviews</H6>
      </div>
      <div className={styles.host_review_header}>
        <div className="ml-4">
          <H6 className="my-4">Guest Review</H6>
          <ReactStars
            count={5}
            value={rating}
            onChange={handleRatingChange}
            size={16}
            activeColor="#FE8501"
            classNames={styles.rating}
          />
          <P2 className="mt-2 text-black">
            Dianne was a fantastic guest! Communication was smooth, and they
            took great care of our apartment. We highly recommend hosting them
            and would gladly welcome them back anytime.
          </P2>

          <P className={styles.author}>John Asake</P>
        </div>
      </div>
      <div className={styles.host_skeleton}>
        <div className={styles.guest_review_skeleton}>
          <H6>Your Review</H6>
          <ReactStars
            count={5}
            value={rating}
            onChange={handleRatingChange}
            size={16}
            activeColor="#FE8501"
            classNames={styles.rating}
          />
          <P2 className="mt-2">
            Dianne was a fantastic guest! Communication was smooth, and they
            took great care of our apartment. We highly recommend hosting them
            and would gladly welcome them back anytime.
          </P2>
        </div>
      </div>
    </div>
  );
};

export default GuestAndHostReview;
