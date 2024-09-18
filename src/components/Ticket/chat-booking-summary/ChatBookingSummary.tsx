import React, { useState } from "react";
import { BookingStatus, BookingTypes } from "@/services/booking/payload";
import type { IBooking } from "@/services/booking/payload";
import dayjs from "dayjs";
import { formatCurrencyNoSymbol } from "@/utils/helpers";
import Link from "next/link";
import styles from "./ChatBookingSummary.module.scss";
import { H6, Label, P, P2 } from "@/components/Headings/Headings";
import Img from "@/components/Image/Image";
import Button from "@/components/Button/Button";

const ChatBookingSummary: React.FC<{ booking: IBooking }> = ({ booking }) => {
  const [showFeeBreakdown, setShowFeeBreakdown] = useState(false);
  const getReservationStatusForGuest = (bookingStatus: BookingStatus) => {
    switch (bookingStatus) {
      case BookingStatus.ACCEPTED:
        return "Accepted as Guest";
      case BookingStatus.CHECKEDIN:
        return "Currently Staying";
      case BookingStatus.DECLINED:
        return "Declined Reservation";
      case BookingStatus.CANCELLED:
        return "Cancelled Reservation";
      case BookingStatus.CHECKEDOUT:
        return "Previously Stayed";
      default:
        return "Pending Reservation";
    }
  };
  if (!booking.Status) booking.Status = BookingStatus.PENDING;
  return (
    <div className={`${styles.container}`}>
      <div className={styles.header}>
        <div className="">
          <div className="flex justify-between gap-2">
            <H6>Booking Details</H6>
            <Link
              target="_blank"
              href={`/user/apartment/reservations/${booking?.Id}`}
            >
              <div className={`${styles.link}`}>
                <P>{booking?.Id?.slice(0, 8)}</P>
              </div>
            </Link>
          </div>
          <div
            className={`${styles.host}  ${
              booking.Status === BookingStatus.PENDING ? "bg-warning100" : ""
            }
            ${booking.Status === BookingStatus.ACCEPTED ? "bg-green-50" : ""}
            ${booking.Status === BookingStatus.CHECKEDIN ? "bg-green-100" : ""}
            ${booking.Status === BookingStatus.DECLINED ? "bg-red-400" : ""}
            ${booking.Status === BookingStatus.CANCELLED ? "bg-grey30" : ""}
            ${
              booking.Status === BookingStatus.CANCELLED ? "bg-orange200" : ""
            }`}
          >
            <Label>{getReservationStatusForGuest(booking.Status)}</Label>
          </div>
        </div>

        <Link
          target="_blank"
          className={`${styles.link} block`}
          href={`${
            booking.Type === BookingTypes.APARTMENT ? "/apartment" : "/hotel"
          }/${booking.Host.Id}`}
        >
          <Img
            path={booking.Service.Imageurl}
            name={"Hotel view"}
            className={styles.img}
          />
          {booking.Type === BookingTypes.APARTMENT
            ? booking.Service.Name
            : booking.Host.Firstname + booking.Host.Lastname}
        </Link>

        <div className={styles.skeleton}>
          <div className="mt-3 text-white700">
            <P2>Guests</P2>
            <P2 className="mt-3">Check-in </P2>
            <P2 className="mt-3">Check-out </P2>
            <P2 className="mt-3">Amount paid </P2>
          </div>
          <div className="mt-3 text-right">
            <P2>
              {(booking.Details?.Adults || 1) +
                (booking.Details?.Children || 0)}{" "}
              Guests
              {booking.Details?.Pets && `  , ${booking.Details?.Pets} Pet`}
            </P2>
            <P2 className="mt-3">
              {dayjs(booking.CheckInDate).format("MMM DD, YYYY")}{" "}
            </P2>
            <P2 className="mt-3">
              {dayjs(booking.CheckInDate).format("MMM DD, YYYY")}{" "}
            </P2>
            <P2 className="mt-3 ">
              {formatCurrencyNoSymbol(booking.PaymentInfo.TotalPaid)}{" "}
            </P2>
          </div>
        </div>
        <div className={styles.skeleton2}>
          <div className={styles.breakdown}>
            <Button
              variant="text"
              color="text"
              onClick={() => setShowFeeBreakdown(!showFeeBreakdown)}
            >
              {showFeeBreakdown ? "Hide" : "Show"} fee breakdown
            </Button>
            {showFeeBreakdown && (
              <div className={styles.base}>
                <div className="text-white700">
                  <P2 className="mt-3">Service Fee</P2>
                  <P2 className="mt-3">Host Service Fee</P2>
                  <P2 className="mt-3">Tax</P2>
                </div>
                <div className="text-right">
                  <P2 className="mt-3">
                    {formatCurrencyNoSymbol(booking.PaymentInfo.Commission)}
                  </P2>
                  <P2 className="mt-3">
                    {formatCurrencyNoSymbol(
                      booking.PaymentInfo.TotalPaid -
                        booking.PaymentInfo.Commission
                    )}
                  </P2>
                  <P2 className="mt-3">
                    {formatCurrencyNoSymbol(booking.PaymentInfo.Tax)}{" "}
                  </P2>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBookingSummary;
