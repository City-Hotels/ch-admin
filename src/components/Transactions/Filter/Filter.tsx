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
                  Payment Status
              </P2>

              <div className={`${styles.input}`}>
                <input
                  placeholder="Payment Status"
                  className={`${styles.innerInput}`}
                  value={filters.Paymentstatus}
                  onChange={(ev) => setFilter({ ...filters, Paymentstatus: ev.currentTarget.value })}
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
                  value={filters.Minamount}
                  onChange={(ev) => setFilter({ ...filters, Minamount: ev.currentTarget.value })}
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
                  value={filters.Maxamount}
                  onChange={(ev) => setFilter({ ...filters, Maxamount: ev.currentTarget.value })}
                />
              </div>
            </div>

            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">
              TransactionType
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
