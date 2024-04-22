import type { FC, ChangeEvent } from "react";
import React, { useEffect, useState } from "react";
import styles from "./Filter.module.scss";
import type FilterProps from "./Filter.props";
import Close from "../../../assets/icons/close.svg";
import Search from "../../../assets/icons/search.svg";
import { H4, P2 } from "@/components/Headings/Headings";
import {
  BookingFilterStatus,
  BookingFilterTypes,
  BookingReviewFilterStatus
} from "@/services/booking/payload";
import CheckboxTwo from "@/components/Checkboxes/CheckboxTwo";
import { ApartmentFilter, ApartmentType, SpaceType } from "@/services/apartment/payload";

const Filter: FC<FilterProps> = ({ className, onClose, setFilter, filter }) => {
  const [filters, updateFilter] = useState<ApartmentFilter>(filter);

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

    return () => { };
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
              <P2 className="font-bold leading-[150%] text-black">Name</P2>

              <div className={`${styles.input}`}>
                <Search className="text-black" />
                <input
                  placeholder="Name"
                  className={`${styles.innerInput}`}
                  value={filters.Name}
                  onChange={(ev) =>
                    setFilter({ ...filters, Name: ev.currentTarget.value })
                  }
                />
              </div>
            </div>
            <div className={`${styles.labelContainer}`}>
              <P2 className="font-bold leading-[150%] text-black">Bed</P2>

              <div className={`${styles.input}`}>
                <Search className="text-black" />
                <input
                  placeholder="Bed"
                  className={`${styles.innerInput}`}
                  typeof="number"
                  value={filters.Bed}
                  onChange={(ev) =>
                    setFilter({ ...filters, Bed: ev.currentTarget.value })
                  }
                />
              </div>
            </div>

            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">Space</P2>

              <div className={`${styles.checkBoxConatainer}`}>
                <CheckboxTwo
                  label="All"
                  name="Space"
                  value={"All"}
                  checked={filter.Space === undefined}
                  onChange={(e) => setFilter({ ...filter, Space: undefined })}
                  className="my-4"
                />
                {Object.values(SpaceType)
                  .filter((value) => typeof value === "string")
                  .map((space) => (
                    <CheckboxTwo
                      name="Space"
                      key={space}
                      label={space as string}
                      value={space}
                      checked={
                        filters.Space ===
                        SpaceType[space as keyof typeof SpaceType]
                      }
                      onClick={() => {
                        setFilter({
                          ...filters,
                          Space: SpaceType[space as keyof typeof SpaceType]
                        });
                      }}
                      className="my-4"
                    />
                  ))}
              </div>
            </div>

            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">
                Apartment Type
              </P2>

              <div className={`${styles.checkBoxConatainer}`}>
                <CheckboxTwo
                  label="All"
                  name="Apartment Type"
                  value={"All"}
                  checked={filter.Type === undefined}
                  onChange={(e) => setFilter({ ...filter, Type: undefined })}
                  className="my-4"
                />
                {Object.values(ApartmentType)
                  .filter((value) => typeof value === "string")
                  .map((apartment) => (
                    <CheckboxTwo
                      name="ReviewStatus"
                      key={apartment}
                      label={apartment as string}
                      value={apartment}
                      checked={
                        filters.Type ===
                        ApartmentType[
                        apartment as keyof typeof ApartmentType
                        ]
                      }
                      onClick={() => {
                        setFilter({
                          ...filters,
                          Type:
                            ApartmentType[
                            apartment as keyof typeof ApartmentType
                            ]
                        });
                      }}
                      className="my-4"
                    />
                  ))}
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
