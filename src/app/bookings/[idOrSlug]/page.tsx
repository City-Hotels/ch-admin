"use client"
import BookingDetails from "@/components/Bookings/BookingDetails/BookingDetails";
import GuestDetails from "@/components/Bookings/GuestDetails/GuestDetails";
import GuestReview from "@/components/Bookings/Review/GuestRequestReview";
import Button from "@/components/Button/Button";
import { H3, H5, H6 } from "@/components/Headings/Headings";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import {
  confrimReservation,
  declineReservation,
  getReservationDetails
} from "@/services/booking";
import {
  BookingReviewStatus,
  BookingStatus,
  type IReservation
} from "@/services/booking/payload";
import queryKeys from "@/utils/api/queryKeys";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "react-query";

function BookingDetailsPage() {
  const router = useRouter();
  const { idOrSlug } = useParams<{ idOrSlug: string }>();
  const bookingId = idOrSlug?.toString() || "";

  const { data, isLoading, refetch } = useQuery(
    [queryKeys.getBookingByID],
    () => {
      const res = getReservationDetails(bookingId);
      return res;
    },
    {
      enabled: !!bookingId // Would only make this request if slug is truthy
    }
  );

  const reservation = (data?.data as IReservation) || {};

  const { mutate, isLoading: isAccepting } = useMutation(confrimReservation);
  const accept = () => {
    mutate(bookingId, {
      onSuccess() {
        refetch();
      }
    });
  };

  const { mutate: declineMutation, isLoading: isDeclining } =
    useMutation(declineReservation);
  const decline = () => {
    declineMutation(bookingId, {
      onSuccess() {
        refetch();
      }
    });
  };

  return (
    <DefaultLayout>
      <div>
        <H3 className="mb-[30px] font-semibold text-[#181A20]">
          Guest reservation details
        </H3>
        {!isLoading && reservation.Id ? (
          <div className="flex flex-col-reverse items-start gap-10 lg:flex-row">
            <div className="flex w-full flex-col gap-[30px]">
              <BookingDetails reservation={reservation} />
              <GuestDetails reservation={reservation} />
              <GuestReview bookingId={bookingId} />
            </div>

            <div className="flex w-full flex-col gap-[58px] md:w-auto  lg:items-center">
              <div className="w-full rounded-md border border-dashed border-white900 bg-grey200 px-[20px] py-[28px] md:w-auto">
                <H5 className="mb-[16px] font-semibold text-white800">
                  Booking ID
                </H5>
                <H6 className="text-black">{bookingId}</H6>
              </div>

              {!reservation.Status ? (
                <div className="flex w-[200px] flex-col gap-5">
                  <Button
                    size="lg"
                    color="primary"
                    onClick={() => accept()}
                    isLoading={isAccepting}
                  >
                    Accept
                  </Button>
                  <Button
                    size="lg"
                    color="muted"
                    variant="outline"
                    onClick={() => decline()}
                    isLoading={isDeclining}
                  >
                    Decline
                  </Button>
                </div>
              ) : (
                (!reservation.ReviewStatus ||
                  (reservation.ReviewStatus !==
                    BookingReviewStatus.GUESTREVIEWED &&
                    reservation.ReviewStatus !==
                    BookingReviewStatus.REVIEWCOMPLETE)) &&
                reservation.Status === BookingStatus.CHECKEDOUT && (
                  <Button size="md" color="primary">
                    Request Review
                  </Button>
                )
              )}
            </div>
          </div>
        ) : (
          <div>Loading</div>
        )}
      </div>
    </DefaultLayout>
  );
}

export default BookingDetailsPage;
