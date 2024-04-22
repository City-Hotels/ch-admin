import type { FC, ChangeEvent } from "react";
import React, { useEffect, useState } from "react";
import styles from "./Filter.module.scss";
import type FilterProps from "./Filter.props";
import Close from "../../../assets/icons/close.svg";
import Search from "../../../assets/icons/search.svg";
import { H4, P2 } from "@/components/Headings/Headings";
import {
  TransactionFilter,
  TransactionType,
  PaymentStatus,
  BookingType,
} from "@/services/transactions/payload";
import CheckboxTwo from "@/components/Checkboxes/CheckboxTwo";

const Filter: FC<FilterProps> = ({ className, onClose, setFilter, filter }) => {

  const [filters, updateFilter] = useState<TransactionFilter>(filter)

  const handleFilterClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
  };
  const handleCloseClick = () => {
    if (onClose) {
      onClose();
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
                UserId
              </P2>

              <div className={`${styles.input}`}>
                <Search className="text-black" />
                <input
                  placeholder="UserId"
                  className={`${styles.innerInput}`}
                  value={filters.UserId}
                  onChange={(ev) => setFilter({ ...filters, UserId: ev.currentTarget.value })}
                />
              </div>
            </div>
            <div className={`${styles.labelContainer}`}>
              <P2 className="font-bold leading-[150%] text-black">
                ServiceId
              </P2>

              <div className={`${styles.input}`}>
                <Search className="text-black" />
                <input
                  placeholder="ServiceId"
                  className={`${styles.innerInput}`}
                  value={filters.ServiceId}
                  onChange={(ev) => setFilter({ ...filters, ServiceId: ev.currentTarget.value })}
                />
              </div>
            </div>

            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">
                Reference
              </P2>

              <div className={`${styles.input}`}>
                <input
                  placeholder="Reference"
                  value={filters.Reference}
                  className={`${styles.innerInput}`}
                  onChange={(ev) => setFilter({ ...filters, Reference: ev.currentTarget.value })}
                />
              </div>
            </div>

            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">
                Date
              </P2>

              <div className={`${styles.input}`}>
                <input
                  placeholder="Date"
                  type="date"
                  className={`${styles.innerInput}`}
                  value={filters.Date}
                  onChange={(ev) => setFilter({ ...filters, Date: ev.currentTarget.value })}
                />
              </div>
            </div>

            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">
                Min-Amount
              </P2>

              <div className={`${styles.input}`}>
                <input
                  placeholder="Min-Amount"
                  className={`${styles.innerInput}`}
                  value={filters.MinAmount}
                  onChange={(ev) => setFilter({ ...filters, MinAmount: ev.currentTarget.value })}
                />
              </div>
            </div>

            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">
                Max-Amount
              </P2>

              <div className={`${styles.input}`}>
                <input
                  placeholder="Max-Amount"
                  className={`${styles.innerInput}`}
                  value={filters.MaxAmount}
                  onChange={(ev) => setFilter({ ...filters, MaxAmount: ev.currentTarget.value })}
                />
              </div>
            </div>

            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">
                Transaction Type
              </P2>
              <div className={`${styles.checkBoxConatainer}`}>
                <CheckboxTwo
                  label="All"
                  name="TransactionType"
                  value={'All'}
                  checked={filter.Type === undefined}
                  onChange={(e) => setFilter({ ...filter, Type: undefined })}
                  className="my-4"
                />
                {Object.values(TransactionType)
                  .filter((value) => typeof value === "string")
                  .map((transactiontype) => (<CheckboxTwo
                    name="TransactionType"
                    key={transactiontype}
                    label={transactiontype as string}
                    value={transactiontype}
                    checked={filters.Type === TransactionType[transactiontype as keyof typeof TransactionType]}
                    onClick={() => {
                      setFilter({ ...filters, Type: TransactionType[transactiontype as keyof typeof TransactionType] })
                    }}
                    className="my-4"
                  />))}
              </div>
            </div>


            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">
                Booking Type
              </P2>
              <div className={`${styles.checkBoxConatainer}`}>
                <CheckboxTwo
                  label="All"
                  name="Booking Type"
                  value={'All'}
                  checked={filter.BookingType === undefined}
                  onChange={(e) => setFilter({ ...filter, BookingType: undefined })}
                  className="my-4"
                />
                {Object.values(BookingType)
                  .filter((value) => typeof value === "string")
                  .map((bookingtype) => (<CheckboxTwo
                    name="BookingType"
                    key={bookingtype}
                    label={bookingtype as string}
                    value={bookingtype}
                    checked={filters.BookingType === BookingType[bookingtype as keyof typeof BookingType]}
                    onClick={() => {
                      setFilter({ ...filters, BookingType: BookingType[bookingtype as keyof typeof BookingType] })
                    }}
                    className="my-4"
                  />))}
              </div>
            </div>


            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">
                Payment Status
              </P2>
              <div className={`${styles.checkBoxConatainer}`}>
                <CheckboxTwo
                  label="All"
                  name="Payment Status"
                  value={'All'}
                  checked={filter.PaymentStatus === undefined}
                  onChange={(e) => setFilter({ ...filter, PaymentStatus: undefined })}
                  className="my-4"
                />
                {Object.values(PaymentStatus)
                  .filter((value) => typeof value === "string")
                  .map((paymentStatus) => (<CheckboxTwo
                    name="Payment Status"
                    key={paymentStatus}
                    label={paymentStatus as string}
                    value={paymentStatus}
                    checked={filters.PaymentStatus === PaymentStatus[paymentStatus as keyof typeof PaymentStatus]}
                    onClick={() => {
                      setFilter({ ...filters, PaymentStatus: PaymentStatus[paymentStatus as keyof typeof PaymentStatus] })
                    }}
                    className="my-4"
                  />))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
