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
import { PromotionFilter, PromotionStatus, PromotionType } from "@/services/promotions/payload";

const Filter: FC<FilterProps> = ({ className, onClose, setFilter, filter }) => {

  const [filters, updateFilter] = useState<PromotionFilter>(filter)

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
                Title
              </P2>

              <div className={`${styles.input}`}>
                <Search className="text-black" />
                <input
                  placeholder="Service Host"
                  className={`${styles.innerInput}`}
                  value={filters.Title}
                  onChange={(ev) => setFilter({ ...filters, Title: ev.currentTarget.value })}
                />
              </div>
            </div>
            <div className={`${styles.labelContainer}`}>
              <P2 className="font-bold leading-[150%] text-black">
                Name
              </P2>

              <div className={`${styles.input}`}>
                <Search className="text-black" />
                <input
                  placeholder="Search Guest"
                  className={`${styles.innerInput}`}
                  value={filters.Name}
                  onChange={(ev) => setFilter({ ...filters, Name: ev.currentTarget.value })}
                />
              </div>
            </div>


            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">
                Promotion Status
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
                {Object.values(PromotionStatus)
                  .filter((value) => typeof value === "string")
                  .map((promotionStatus) => (<CheckboxTwo
                    name="Status"
                    key={promotionStatus}
                    label={promotionStatus as string}
                    value={promotionStatus}
                    checked={filters.Status === PromotionStatus[promotionStatus as keyof typeof PromotionStatus]}
                    onClick={() => {
                      setFilter({ ...filters, Status: PromotionStatus[promotionStatus as keyof typeof PromotionStatus]})
                    }}
                    className="my-4"
                  />))}
              </div>
            </div>

            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">
                Promotion Type
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
                {Object.values(PromotionType)
                  .filter((value) => typeof value === "string")
                  .map((promotionType) => (<CheckboxTwo
                    name="ReviewStatus"
                    key={promotionType}
                    label={promotionType as string}
                    value={promotionType}
                    checked={filters.Type === PromotionType[promotionType as keyof typeof PromotionType]}
                    onClick={() => {
                      setFilter({ ...filters, Type: PromotionType[promotionType as keyof typeof PromotionType] })
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
