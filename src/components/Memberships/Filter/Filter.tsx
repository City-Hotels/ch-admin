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
import Radio from "@/components/Inputs/radio/Radio";
import CheckboxTwo from "@/components/Checkboxes/CheckboxTwo";
import {
  PromotionFilter,
  PromotionFilterStatus,
  PromotionStatus,
  PromotionType
} from "@/services/promotions/payload";

const Filter: FC<FilterProps> = ({ className, onClose, setFilter, filter }) => {
  const [filters, updateFilter] = useState<PromotionFilter>(filter);

  const handleFilterClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
  };
  const handleCloseClick = () => {
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    updateFilter(filter);

    return () => {};
  }, [filter]);

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
              <P2 className="font-bold leading-[150%] text-black">Title</P2>

              <div className={`${styles.input}`}>
                <Search className="text-black" />
                <input
                  placeholder="e.g: Kaiser Royale"
                  className={`${styles.innerInput}`}
                  value={filters.Title}
                  onChange={(ev) =>
                    setFilter({ ...filters, Title: ev.currentTarget.value })
                  }
                />
              </div>
            </div>

            <div className={`${styles.labelContainer}`}>
              <P2 className="font-bold leading-[150%] text-black">
                Short Description
              </P2>

              <div className={`${styles.input}`}>
                <Search className="text-black" />
                <input
                  placeholder="e.g: Elegance and Prestigue"
                  className={`${styles.innerInput}`}
                  value={filters.ShortDescription}
                  onChange={(ev) =>
                    setFilter({
                      ...filters,
                      ShortDescription: ev.currentTarget.value
                    })
                  }
                />
              </div>
            </div>

            <div className={`${styles.labelContainer}`}>
              <P2 className="font-bold leading-[150%] text-black">Price</P2>

              <div className={`${styles.input}`}>
                <Search className="text-black" />
                <input
                  placeholder="Price"
                  className={`${styles.innerInput}`}
                  value={filters.ShortDescription}
                  onChange={(ev) =>
                    setFilter({
                      ...filters,
                      ShortDescription: ev.currentTarget.value
                    })
                  }
                />
              </div>
            </div>

            <div className={`${styles.labelContainer}`}>
              <P2 className="font-bold leading-[150%] text-black">
                Max Participants
              </P2>

              <div className={`${styles.input2}`}>
                <input
                  className={`${styles.innerInput}`}
                  value={filters.MaxParticipant}
                  onChange={(ev) => {
                    const value = ev.currentTarget.value;
                    // Check if the input is empty
                    if (value === "") {
                      setFilter({ ...filters, MaxParticipant: 0 }); // Set to null or undefined for an empty input
                    } else if (!isNaN(parseInt(value, 10))) {
                      setFilter({
                        ...filters,
                        MaxParticipant: parseInt(value, 10)
                      });
                    }
                  }}
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
                  value={"All"}
                  checked={filter.Status === undefined}
                  onChange={(e) => setFilter({ ...filter, Status: undefined })}
                  className="my-4"
                />
                {Object.values(PromotionFilterStatus)
                  .filter((value) => typeof value === "string")
                  .map((promotionStatus) => (
                    <CheckboxTwo
                      name="Status"
                      key={promotionStatus}
                      label={promotionStatus as string}
                      value={promotionStatus}
                      checked={
                        filters.Status ===
                        PromotionFilterStatus[
                          promotionStatus as keyof typeof PromotionFilterStatus
                        ]
                      }
                      onClick={() => {
                        setFilter({
                          ...filters,
                          Status:
                            PromotionFilterStatus[
                              promotionStatus as keyof typeof PromotionFilterStatus
                            ]
                        });
                      }}
                      className="my-4"
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
