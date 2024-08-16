import { H6, Label, P, P2 } from "@/components/shared/headings/Headings";
import Img from "@/components/shared/images/Image";
import React, { useState } from "react";
import dayjs from "dayjs";
import type { IReservation } from "@/services/booking/payload";
import { BookingStatus } from "@/services/booking/payload";
import { formatCurrencyNoSymbol } from "@/utils/helpers";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/slice/auth/auth.slice";
import { UserRoles } from "@/services/user/payload";
import styles from "./ChatBookingSummary.module.scss";
import Button from "../../button/Button";

const ChatHostingSummary: React.FC<{ reservation: IReservation }> = ({
  reservation
}) => {
  const user = useSelector(selectCurrentUser);
  const isHotelAdmin = user.Role === UserRoles.HOTELADMIN;
  const [showFeeBreakdown, setShowFeeBreakdown] = useState(false);
  const getReservationStatus = (bookingStatus: BookingStatus) => {
    switch (bookingStatus) {
      case BookingStatus.ACCEPTED:
        return "Accepted Hosting";
      case BookingStatus.CHECKEDIN:
        return "Currently Hosting";
      case BookingStatus.DECLINED:
        return "Declined Hosting";
      case BookingStatus.CANCELLED:
        return "ancelled Hosting";
      case BookingStatus.CHECKEDOUT:
        return "Previously Hosted";
      default:
        return "Pending Hosted";
    }
  };

  const totalGuests =
    (reservation.Details?.Adults || 1) + (reservation.Details?.Children || 0);

  if (!reservation.Status) reservation.Status = BookingStatus.PENDING;
  return (
    <div className={styles.container}>
      <div className={`${styles.header} `}>
        <div className=" flex justify-between gap-2">
          <H6 className="inline">Reservation Details</H6>
          <Link
            target="_blank"
            href={`/user/apartment/reservations/${reservation.Id}`}
          >
            <div className={`${styles.link}`}>
              <P>{reservation.Id.slice(0, 8)}</P>
              {/* <ExternalLinkIcon /> */}
            </div>
          </Link>
        </div>

        <div
          className={`${styles.host}  ${
            reservation.Status === BookingStatus.PENDING ? "bg-warning100" : ""
          }
            ${
              reservation.Status === BookingStatus.ACCEPTED
                ? "bg-green-100"
                : ""
            }
            ${
              reservation.Status === BookingStatus.CHECKEDIN
                ? "bg-green-300"
                : ""
            }
            ${reservation.Status === BookingStatus.DECLINED ? "bg-red-400" : ""}
            ${reservation.Status === BookingStatus.CANCELLED ? "bg-grey30" : ""}
            ${
              reservation.Status === BookingStatus.CHECKEDOUT
                ? "bg-orange200"
                : ""
            }`}
        >
          <Label>{getReservationStatus(reservation.Status)}</Label>
        </div>

        <Link
          target="_blank"
          className={`${styles.link} block`}
          href={`${isHotelAdmin ? "/hotel/room" : "/user/apartment"}/${
            reservation.Service.Id
          }`}
        >
          <Img
            path={reservation.Service.Imageurl}
            name={"Hotel view"}
            className={styles.img}
          />
          {reservation.Service.Name}
        </Link>

        <div className={styles.skeleton}>
          <div className="mt-2 text-white700">
            <P2>Guests</P2>
            <P2 className="mt-3">Check-in </P2>
            <P2 className="mt-3">Check-out </P2>
            <P2 className="mt-3">Amount paid </P2>
          </div>
          <div className="mt-2  text-right">
            <P2>
              {totalGuests} Guest
              {totalGuests > 1 && "s"}
              {reservation.Details?.Pets &&
                `  , ${reservation.Details?.Pets} Pet`}
            </P2>
            <P2 className="mt-3">
              {dayjs(reservation.CheckInDate).format("MMM DD, YYYY")}{" "}
            </P2>
            <P2 className="mt-3">
              {dayjs(reservation.CheckInDate).format("MMM DD, YYYY")}{" "}
            </P2>
            <P2 className="mt-3 ">
              {formatCurrencyNoSymbol(reservation.PaymentInfo.TotalPaid)}{" "}
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
                  <P2 className="mt-3 text-nowrap">Host Service Fee</P2>
                  <P2 className="mt-3">Tax</P2>
                </div>
                <div className="text-right">
                  <P2 className="mt-3">
                    {formatCurrencyNoSymbol(reservation.PaymentInfo.Commission)}
                  </P2>
                  <P2 className="mt-3">
                    {" "}
                    {formatCurrencyNoSymbol(
                      reservation.PaymentInfo.TotalPaid -
                        reservation.PaymentInfo.Commission
                    )}
                  </P2>
                  <P2 className="mt-3">
                    {formatCurrencyNoSymbol(reservation.PaymentInfo.Tax)}{" "}
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

export default ChatHostingSummary;
