import React from "react";
// import HotelImg from "@/assets/images/Hotelview.png";
// import BookingStatusPill from "@/components/BookingStatusPill/BookingStatusPill";
import type BookingDetailsProps from "./BookingDeails.props";
import styles from "./BookingDetails.module.scss";
import { H6, H4, P2 } from "@/components/Headings/Headings";
import Img from "@/components/Image/Image";

const BookingDetails: React.FC<BookingDetailsProps> = ({
  reservation: { PaymentInfo, CheckOutDate, CheckInDate, Service, Status }
}) => {
  return (
    <div className={`${styles.bookingDetailsContainer}`}>
      <div className={`${styles.bookingDetailsHeader}`}>
        <H6>Booking Details</H6>
        {/* <BookingStatusPill Status={Status} /> */}
      </div>

      <div className={`${styles.bookingDetails}`}>
        <Img
          path={""}
          name="image of booked hotel"
          className={`${styles.bookingImg}`}
        />

        <div className="w-full">
          <H4>{Service?.Name}</H4>

          <div className={`${styles.bookingAmount}`}>
            <P2 className="text-white800">Amount paid</P2>
            <P2 weight="bold" className="font-bold text-[#181A20]">
              &#36;{PaymentInfo?.TotalPaid}
            </P2>
          </div>

          <div className={`${styles.bookingDates}`}>
            <div>
              <P2 className="text-white800">Check-in</P2>
              <P2 weight="bold" className="font-bold text-[#181A20]">
                {CheckInDate}
              </P2>
            </div>

            <div>
              <P2 className="text-white800">Check-out</P2>
              <P2 weight="bold" className="font-bold text-[#181A20]">
                {CheckOutDate}
              </P2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
