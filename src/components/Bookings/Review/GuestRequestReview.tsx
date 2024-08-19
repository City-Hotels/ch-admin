import Button from "@/components/Button/Button";
import { H6, P, P2 } from "@/components/Headings/Headings";
import Modal from "@/components/Modal/Modal";
import { getBookingReview } from "@/services/review";
import type { IReview } from "@/services/review/payload";
import queryKeys from "@/utils/api/queryKeys";
import { useState } from "react";
import { useQuery } from "react-query";
import ReactStars from "react-rating-star-with-type";
import styles from "./Reviews.module.scss";

interface GuestReviewRequestProps {
  bookingId: string;
}

const GuestReview: React.FC<GuestReviewRequestProps> = ({ bookingId }) => {
  const [firstModal, setFirstModal] = useState(false);

  const { data, refetch } = useQuery(
    [queryKeys.getReviewByBookingID, bookingId],
    () => getBookingReview(bookingId),
    {
      enabled: !!bookingId // Would only make this request if slug is truthy
    }
  );

  const review = data?.data as IReview;

  return (
    <div className={styles.guest_review_container}>
      <H6>Reviews</H6>

      <div className={styles.guest_review_header}>
        <H6>Guest Review</H6>
        {review && review.Rating ? (
          <>
            <ReactStars
              count={5}
              value={review.Rating.Overall / 2}
              size={16}
              activeColor="#FE8501"
              classNames={styles.rating}
            />
            <P2 className=" text-black">{review.Message}</P2>
            <P className={styles.author}>{review.Guest.FullName}</P>
          </>
        ) : (
          <>
            <P className="text-white700">No feedback</P>
            <Button color="text">
              <P className={styles.guest_review_button}>
                Request review from guest
              </P>
            </Button>
          </>
        )}
      </div>

      <div className={styles.host_review_header}>
        <H6>Your Review</H6>

        {review && review.Reply && review.Reply.Message ? (
          <>
            <ReactStars
              count={5}
              value={review.Reply?.Rating?.Overall}
              size={16}
              activeColor="#FE8501"
              classNames={styles.rating}
            />
            <P2 className=" text-black">{review.Reply.Message}</P2>
          </>
        ) : (
          <P className="text-white700">No reviews yet</P>

        )}
      </div>
      {/* 
      <Modal
        openModal={firstModal}
        setOpenModal={setFirstModal}
        variant="filled"
      >
        <HostReviewModal
          onSubmit={refetch}
          onCancel={() => setFirstModal(false)}
          bookingId={bookingId}
        />
      </Modal> */}
    </div>
  );
};

export default GuestReview;
