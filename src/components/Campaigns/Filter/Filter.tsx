import type { FC } from "react";
import React, { useEffect, useState } from "react";
import styles from "./Filter.module.scss";
import type FilterProps from "./Filter.props";
import Close from "../../../assets/icons/close.svg";
import Search from "../../../assets/icons/search.svg";
import { H2, H4, P2 } from "@/components/Headings/Headings";
import CheckboxTwo from "@/components/Checkboxes/CheckboxTwo";
import {
  PricingType,
  PromotionFilter,
  PromotionStatus
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
        <div className={`${styles.filterContainer} `}>
          <div className={`${styles.filter}`}>
            <div className={`${styles.filterTitle}`}>
              <Close className="cursor-pointer" onClick={handleCloseClick} />
              <H4 className="font-semibold">Filter by</H4>
            </div>
          </div>

          <div className={styles.filterForm}>
            <div className={`${styles.labelContainer}`}>
              <P2 className="font-bold leading-[150%] text-black">Name</P2>

              <div className={`${styles.input}`}>
                <Search className="text-black" />
                <input
                  placeholder="e.g: Kaiser Royale"
                  className={`${styles.innerInput}`}
                  value={filters.Name}
                  onChange={(ev) =>
                    setFilter({ ...filters, Name: ev.currentTarget.value })
                  }
                />
              </div>
            </div>

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
                Maximum Bookings
              </P2>

              <div className={`${styles.input}`}>
                <Search className="text-black" />
                <input
                  id="maximumBooking"
                  placeholder="e.g: 500"
                  className="w-full outline-none"
                  value={filter.MaximumBooking}
                  onChange={(ev) => {
                    const value = ev.currentTarget.value;
                    if (value == "") {
                      setFilter({
                        ...filters,
                        MaximumBooking: 0
                      });
                    } else if (!isNaN(parseInt(value, 10))) {
                      setFilter({
                        ...filters,
                        MaximumBooking: parseInt(value, 10)
                      });
                    }
                  }}
                />
              </div>
            </div>

            <div className={`${styles.labelContainer}`}>
              <P2 className="font-bold leading-[150%] text-black">
                Minimum Bookings
              </P2>

              <div className={`${styles.input}`}>
                <Search className="text-black" />
                <input
                  id="minimumBooking"
                  placeholder="e.g: 50"
                  className="w-full outline-none"
                  value={filters.MinimumBooking}
                  onChange={(ev) => {
                    const value = ev.currentTarget.value;
                    if (value == "") {
                      setFilter({
                        ...filters,
                        MinimumBooking: 0
                      });
                    } else if (!isNaN(parseInt(value, 10))) {
                      setFilter({
                        ...filters,
                        MinimumBooking: parseInt(value, 10)
                      });
                    }
                  }}
                />
              </div>
            </div>

            <div className={`${styles.labelContainer}`}>
              <P2 className="font-bold leading-[150%] text-black">
                Max Participants
              </P2>

              <div className={`${styles.input}`}>
                <Search className="text-black" />
                <input
                  placeholder="e.g: 100"
                  className={`${styles.innerInput}`}
                  value={filters.MaxParticipant}
                  onChange={(ev) => {
                    const value = ev.currentTarget.value;

                    if (value === "") {
                      setFilter({ ...filters, MaxParticipant: 0 });
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
              <P2 className="font-bold leading-[150%] text-black">
                Booking Discount
              </P2>

              <div className={`${styles.input}`}>
                <Search className="text-black" />
                <input
                  placeholder="e.g: 10"
                  className={`${styles.innerInput}`}
                  value={filters.BookingDiscount}
                  onChange={(ev) => {
                    const value = ev.currentTarget.value;

                    if (value === "") {
                      setFilter({ ...filters, BookingDiscount: 0 });
                    } else if (!isNaN(parseInt(value, 10))) {
                      setFilter({
                        ...filters,
                        BookingDiscount: parseInt(value, 10)
                      });
                    }
                  }}
                />
              </div>
            </div>

            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">
                Pricing Type
              </P2>

              <div className={`${styles.checkBoxConatainer}`}>
                <CheckboxTwo
                  label="All"
                  name="Status"
                  value={"All"}
                  checked={filter.SearchStatus === false}
                  onChange={(e) => setFilter({ ...filter, SearchStatus: false })}
                  className="my-4"
                />
                {Object.values(PricingType)
                  .filter((value) => typeof value === "string")
                  .map((pricingType) => (
                    <CheckboxTwo
                      name="Status"
                      key={pricingType}
                      label={pricingType as string}
                      value={pricingType}
                      checked={
                        filters.PricingType ===
                        PricingType[
                          pricingType as keyof typeof PricingType
                        ]
                      }
                      onClick={() => {
                        setFilter({
                          ...filters,
                          SearchStatus: true,
                          PricingType:
                          PricingType[
                            pricingType as keyof typeof PricingType
                          ]
                        });
                      }}
                      className="my-4"
                    />
                  ))}
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
                {Object.values(PromotionStatus)
                  .filter((value) => typeof value === "string")
                  .map((promotionStatus) => (
                    <CheckboxTwo
                      name="Status"
                      key={promotionStatus}
                      label={promotionStatus as string}
                      value={promotionStatus}
                      checked={
                        filters.Status ===
                        PromotionStatus[
                          promotionStatus as keyof typeof PromotionStatus
                        ]
                      }
                      onClick={() => {
                        setFilter({
                          ...filters,
                          SearchStatus: true,
                          Status:
                          PromotionStatus[
                              promotionStatus as keyof typeof PromotionStatus
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
