import type { FC, ChangeEvent } from "react";
import React, { useEffect, useState } from "react";
import StarIcon from "@/assets/icons/star.svg";
import styles from "./Filter.module.scss";
import type FilterProps from "./Filter.props";
import Close from "../../../assets/icons/close.svg";
import Search from "../../../assets/icons/search.svg";
import { H4, P2 } from "@/components/Headings/Headings";
import Checkbox from "@/components/Inputs/checkbox/Checkbox";
import Button from "@/components/Button/Button";
import { BookingFilter, BookingFilterStatus, BookingFilterTypes, BookingReviewFilterStatus, BookingReviewStatus } from "@/services/booking/payload";
import Radio from "@/components/Inputs/radio/Radio";
import CheckboxTwo from "@/components/Checkboxes/CheckboxTwo";
import dayjs from "dayjs";

const Filter: FC<FilterProps> = ({ className, onClose, setFilter, filter }) => {

  const [filters, updateFilter] = useState<BookingFilter>(filter)

  const handleFilterClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation(); // Prevent event from propagating to parent elements
  };
  const handleCloseClick = () => {
    if (onClose) {
      onClose(); // Close the filter when the close icon is clicked
    }
  };

  useEffect(() => {
    updateFilter(filter)

    return () => {

    }
  }, [filter])


  return (
    <div className={styles.filter_nav_container}>
      <div
        className={`${styles.filterOverlay} ${className}`}
        onClick={handleFilterClick}
      >
        <div className={`${styles.filterContainer}`}>
          <div className={`${styles.filter}`}>
            <div className={`${styles.filterTitle}`}>
              <Close className="cursor-pointer" onClick={handleCloseClick} />
              <H4 className="font-semibold">Filter by</H4>
            </div>
          </div>
          <div className={styles.filterForm}>
            <div className={`${styles.labelContainer}`}>
              <P2 className="font-bold leading-[150%] text-black">
                Host
              </P2>

              <div className={`${styles.input}`}>
                <Search className="text-black" />
                <input
                  placeholder="Service Host"
                  className={`${styles.innerInput}`}
                  value={filters.HostName}
                  onChange={(ev) => setFilter({ ...filters, HostName: ev.currentTarget.value })}
                />
              </div>
            </div>
            <div className={`${styles.labelContainer}`}>
              <P2 className="font-bold leading-[150%] text-black">
                Guest
              </P2>

              <div className={`${styles.input}`}>
                <Search className="text-black" />
                <input
                  placeholder="Search Guest"
                  className={`${styles.innerInput}`}
                  value={filters.GuestName}
                  onChange={(ev) => setFilter({ ...filters, GuestName: ev.currentTarget.value })}
                />
              </div>
            </div>

            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">
                Checkin Date
              </P2>

              <div className={`${styles.input}`}>
                <input
                  placeholder="Service Name"
                  type="date"
                  value={filters.CheckInDate}
                  className={`${styles.innerInput}`}
                  onChange={(ev) => setFilter({ ...filters, CheckInDate: ev.currentTarget.value })}
                />
              </div>
            </div>

            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">
                Checkout Date
              </P2>

              <div className={`${styles.input}`}>
                <input
                  placeholder="Service Name"
                  type="date"
                  className={`${styles.innerInput}`}
                  value={filters.CheckOutDate}
                  onChange={(ev) => setFilter({ ...filters, CheckOutDate: ev.currentTarget.value })}
                />
              </div>
            </div>
            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">
                Booking Date
              </P2>

              <div className={`${styles.input}`}>
                <input
                  placeholder="Service Name"
                  type="date"
                  className={`${styles.innerInput}`}
                  value={filters.BookingDate}
                  onChange={(ev) => setFilter({ ...filters, BookingDate: ev.currentTarget.value })}
                />
              </div>
            </div>
            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">
                Booked Between
              </P2>

              <div className={`${styles.input} flex gap-3`}>
                <input
                  placeholder="Service Name"
                  type="date"
                  className={`${styles.innerInput}`}
                  value={filters.BookedByStartDate}
                  onChange={(ev) => setFilter({ ...filters, BookedByStartDate: ev.currentTarget.value })}
                />
                <input
                  placeholder="Service Name"
                  type="date"
                  className={`${styles.innerInput}`}
                  value={filters.BookedByEndDate}
                  onChange={(ev) => setFilter({ ...filters, BookedByEndDate: ev.currentTarget.value })}
                />
              </div>
            </div>

            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">
                Booking Status
              </P2>

              <div className={`${styles.checkBoxConatainer}`}>
                <CheckboxTwo
                  label="All"
                  name="Status"
                  value={'All'}
                  checked={filter.Status === undefined}
                  onChange={(e) => setFilter({ ...filter, Status: undefined })}
                  className="my-4"
                />
                {Object.values(BookingFilterStatus)
                  .filter((value) => typeof value === "string")
                  .map((bookingStatus) => (<CheckboxTwo
                    name="Status"
                    key={bookingStatus}
                    label={bookingStatus as string}
                    value={bookingStatus}
                    checked={filters.Status === BookingFilterStatus[bookingStatus as keyof typeof BookingFilterStatus]}
                    onClick={() => {
                      setFilter({ ...filters, Status: BookingFilterStatus[bookingStatus as keyof typeof BookingFilterStatus] })
                    }}
                    className="my-4"
                  />))}
              </div>
            </div>

            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">
                Customer Review
              </P2>
              <div className={`${styles.checkBoxConatainer}`}>
                <CheckboxTwo
                  label="All"
                  name="Rating"
                  value={undefined}
                  // checked={filter.Status === undefined}
                  // onChange={(e) => setFilter({ ...filter, Status: undefined })}
                  className="my-4"
                />
                <CheckboxTwo
                  label="Excellent (8+)"
                  name="Rating"
                  value={8}
                  // checked={filter.Status === undefined}
                  // onChange={(e) => setFilter({ ...filter, Status: undefined })}
                  className="my-4"
                />
                <CheckboxTwo
                  label="Good (6+)"
                  name="Rating"
                  value={6}
                  // checked={filter.Status === undefined}
                  // onChange={(e) => setFilter({ ...filter, Status: undefined })}
                  className="my-4"
                />
                <CheckboxTwo
                  label="Average (4+)"
                  name="Rating"
                  value={4}
                  // checked={filter.Status === undefined}
                  // onChange={(e) => setFilter({ ...filter, Status: undefined })}
                  className="my-4"
                />
                <CheckboxTwo
                  label="Poor (< 4)"
                  name="Rating"
                  value={1}
                  // checked={filter.Status === undefined}
                  // onChange={(e) => setFilter({ ...filter, Status: undefined })}
                  className="my-4"
                />
              </div>

            </div>


            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">
                Review Status
              </P2>

              <div className={`${styles.checkBoxConatainer}`}>
                <CheckboxTwo
                  label="All"
                  name="ReviewStatus"
                  value={'All'}
                  checked={filter.Status === undefined}
                  onChange={(e) => setFilter({ ...filter, Status: undefined })}
                  className="my-4"
                />
                {Object.values(BookingReviewFilterStatus)
                  .filter((value) => typeof value === "string")
                  .map((bookingStatus) => (<CheckboxTwo
                    name="ReviewStatus"
                    key={bookingStatus}
                    label={BookingReviewFilterStatus[bookingStatus] as string}
                    value={bookingStatus}
                    checked={filters.ReviewStatus === BookingReviewFilterStatus[bookingStatus as keyof typeof BookingReviewFilterStatus]}
                    onClick={() => {
                      setFilter({ ...filters, ReviewStatus: BookingReviewFilterStatus[bookingStatus as keyof typeof BookingReviewFilterStatus] })
                    }}
                    className="my-4"
                  />))}
              </div>

            </div>

            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">
                Service Type
              </P2>
              <div className={`${styles.checkBoxConatainer}`}>
                <CheckboxTwo
                  label="All"
                  name="ReviewStatus"
                  value={'All'}
                  checked={filter.Status === undefined}
                  onChange={(e) => setFilter({ ...filter, Status: undefined })}
                  className="my-4"
                />
                {Object.values(BookingFilterTypes)
                  .filter((value) => typeof value === "string")
                  .map((bookingStatus) => (<CheckboxTwo
                    name="ReviewStatus"
                    key={bookingStatus}
                    label={bookingStatus as string}
                    value={bookingStatus}
                    checked={filters.Type === BookingFilterTypes[bookingStatus as keyof typeof BookingFilterTypes]}
                    onClick={() => {
                      setFilter({ ...filters, Type: BookingFilterTypes[bookingStatus as keyof typeof BookingFilterTypes] })
                    }}
                    className="my-4"
                  />))}
              </div>

            </div>
          </div>

          {/* <div className={`${styles.clearFilterContainer}`}>
            <div className="cursor-pointer font-matter-bold underline">
              Clear Filter
            </div>

            <Button color="primary" size="lg">
              Show 800+ Hotels
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Filter;
