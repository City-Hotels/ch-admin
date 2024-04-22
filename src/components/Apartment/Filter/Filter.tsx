import type { FC } from "react";
import React, { useEffect, useState } from "react";

import styles from "./Filter.module.scss";
import type FilterProps from "./Filter.props";
import Close from "../../../assets/icons/close.svg";
import Search from "../../../assets/icons/search.svg";
import { H4, P2 } from "@/components/Headings/Headings";
import { IApartmentFilter, ApartmentType } from "@/services/apartment/payload";

import CheckboxTwo from "@/components/Checkboxes/CheckboxTwo";

const Filter: FC<FilterProps> = ({ className, onClose, setFilter, filter }) => {

  const [filters, updateFilter] = useState<IApartmentFilter>(filter)

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
                Host ID
              </P2>

              <div className={`${styles.input}`}>
                <Search className="text-black" />
                <input
                  placeholder="search by service host id"
                  className={`${styles.innerInput}`}
                  value={filters.HostId}
                  onChange={(ev) => setFilter({ ...filters, HostId: ev.currentTarget.value })}
                />
              </div>
            </div>
            <div className={`${styles.labelContainer}`}>
              <P2 className="font-bold leading-[150%] text-black">
                Apartment ID
              </P2>

              <div className={`${styles.input}`}>
                <Search className="text-black" />
                <input
                  placeholder="search by apartment id"
                  className={`${styles.innerInput}`}
                  value={filters.ApartmentId}
                  onChange={(ev) => setFilter({ ...filters, ApartmentId: ev.currentTarget.value })}
                />
              </div>
            </div>
            <div className={`${styles.labelContainer}`}>
              <P2 className="font-bold leading-[150%] text-black">
                Location
              </P2>

              <div className={`${styles.input}`}>
                <Search className="text-black" />
                <input
                  placeholder="search by location"
                  className={`${styles.innerInput}`}
                  value={filters.Location}
                  onChange={(ev) => setFilter({ ...filters, Location: ev.currentTarget.value })}
                />
              </div>
            </div>
            <div className={`${styles.labelContainer}`}>
              <P2 className="font-bold leading-[150%] text-black">
                Facilities
              </P2>

              <div className={`${styles.input}`}>
                <Search className="text-black" />
                <input
                  placeholder="search by facilities"
                  className={`${styles.innerInput}`}
                  value={filters.Facilities}
                  onChange={(ev) => setFilter({ ...filters, Facilities: ev.currentTarget.value })}
                />
              </div>
            </div>

            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">
                Max Adults
              </P2>

              <div className={`${styles.input}`}>
                <input
                  placeholder=""
                  type="number"
                  value={filters.CheckInDate}
                  className={`${styles.innerInput}`}
                  onChange={(ev) => setFilter({ ...filters, MaxAdults: ev.currentTarget.value })}
                />
              </div>
            </div>


            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">
                Max Children
              </P2>

              <div className={`${styles.input}`}>
                <input
                  placeholder=""
                  type="number"
                  className={`${styles.innerInput}`}
                  value={filters.CheckOutDate}
                  onChange={(ev) => setFilter({ ...filters, MaxChildren: ev.currentTarget.value })}
                />
              </div>
            </div>
            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">
                Max Bedroom
              </P2>

              <div className={`${styles.input}`}>
                <input
                  placeholder=""
                  type="number"
                  value={filters.CheckInDate}
                  className={`${styles.innerInput}`}
                  onChange={(ev) => setFilter({ ...filters, MaxBedroom: ev.currentTarget.value })}
                />
              </div>
            </div>
            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">
                Bath Rooms
              </P2>

              <div className={`${styles.input}`}>
                <input
                  placeholder="Min. number of bathrooms"
                  type="number"
                  className={`${styles.innerInput}`}
                  value={filters.MaxAdults}
                  onChange={(ev) => setFilter({ ...filters, BathCount: ev.currentTarget.value })}
                />
              </div>
            </div>
            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">
                Price Range
              </P2>

              <div className={`${styles.input} flex gap-3`}>
                <input
                  placeholder="Min Nightly Rate"
                  type="text"
                  value={filters.CheckInDate}
                  className={`${styles.innerInput}`}
                  onChange={(ev) => setFilter({ ...filters, MinNightlyPrice: ev.currentTarget.value })}
                />
                <input
                  placeholder="Max Nightly Rate"
                  type="text"
                  className={`${styles.innerInput}`}
                  value={filters.MaxAdults}
                  onChange={(ev) => setFilter({ ...filters, MaxNightlyPrice: ev.currentTarget.value })}
                />
              </div>
            </div>
            <div className={`${styles.labelContainer}`}>
              <P2 className="font-bold leading-[150%] text-black">
                Booked Between
              </P2>

              <div className={`${styles.input} flex gap-3`}>
                <input
                  placeholder=""
                  type="date"
                  value={filters.CheckInDate}
                  className={`${styles.innerInput}`}
                  onChange={(ev) => setFilter({ ...filters, CheckInDate: ev.currentTarget.value })}
                />
                <input
                  placeholder="Service Name"
                  type="date"
                  className={`${styles.innerInput}`}
                  value={filters.MaxAdults}
                  onChange={(ev) => setFilter({ ...filters, MaxBedRoom: ev.currentTarget.value })}
                />
              </div>
            </div>

            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">
                Apartment Status
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
                {Object.values(ApartmentType)
                  .filter((value) => typeof value === "string")
                  .map((apartmentType) => (<CheckboxTwo
                    name="Status"
                    key={apartmentType}
                    label={apartmentType as string}
                    value={apartmentType}
                    checked={filters.Type === ApartmentType[apartmentType as keyof typeof ApartmentType]}
                    onClick={() => {
                      setFilter({ ...filters, Type: ApartmentType[apartmentType as keyof typeof ApartmentType] })
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
