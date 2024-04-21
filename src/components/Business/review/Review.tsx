import React, { useState } from "react";
import GuestReviewItem from "@/components/Reviews/GuestReviewItem";
import Button from "@/components/Button/Button";
import { H4, P } from "@/components/Headings/Headings";
import Modal from "@/components/Modal/Modal";
import ReviewModal from "@/components/Reviews/ReviewModal";
import { getReviewsOnHost, getReviewsStatistics } from "@/services/review";
import { useQuery } from "react-query";
import queryKeys from "@/utils/api/queryKeys";
import type {
  IReviewStatisticsPayload,
  IReview
} from "@/services/review/payload";
import ReviewStatistics from "@/components/Reviews/ReviewStatistics";
import { getStateHotel } from "@/store/slice/hotel/hotel.slice";
import { useSelector } from "react-redux";
import styles from "./Review.module.scss";

const Review: React.FC = () => {
  const hotel = useSelector(getStateHotel);
  const serviceId = hotel?.Id || "";
  const [showReviewsModal, setShowReviewsModal] = useState(false);

  const { data: statsRes } = useQuery(
    [queryKeys.getReviewsStatistics, serviceId],
    () => getReviewsStatistics({ HostId: serviceId }),
    {
      enabled: !!serviceId // Would only make this request if slug is truthy
    }
  );

  const reviewStats = statsRes?.data as IReviewStatisticsPayload;

  const { data } = useQuery(
    [queryKeys.getReviews, serviceId],
    () => getReviewsOnHost(serviceId),
    {
      enabled: !!serviceId // Would only make this request if slug is truthy
    }
  );

  const reviews = (data?.data.Reviews as IReview[]) || [];

  return (
    <div>
      <div className={`${styles.reviewContainer}`}>
        <div className="">
          <H4 className="mb-4">Reviews</H4>
          <P className="mb-2">
            {reviews && reviews?.length > 0
              ? `${reviewStats?.Overall || 0}/10 • ${reviews?.length} Review${reviews?.length > 1 ? "s" : ""
              }`
              : `Your ${hotel?.BusinessType?.toLocaleLowerCase()} has no reviews!`}
          </P>

          {reviews && reviews?.length > 0 && reviewStats && (
            <ReviewStatistics reviews={reviewStats || undefined} />
          )}
        </div>

        {reviews && reviews?.length > 0 && (
          <div className="mt-2 md:mt-12  lg:basis-2/4 lg:flex-row ">
            {reviews
              ?.filter((_item, index) => index < 4)
              .map((review) => (
                <GuestReviewItem
                  review={review}
                  key={`review${review.BookingId}`}
                />
              ))}

            <Button
              className={`${styles.reviewButton}`}
              color="outline"
              variant="outline"
              size="md"
              onClick={() => setShowReviewsModal(true)}
            >
              See all reviews
            </Button>
          </div>
        )}
      </div>

      <Modal
        openModal={showReviewsModal}
        setOpenModal={setShowReviewsModal}
        variant="filled"
      >
        <div className="">
          <ReviewModal
            onClose={() => setShowReviewsModal(false)}
            reviews={reviews || []}
            reviewStats={reviewStats}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Review;
