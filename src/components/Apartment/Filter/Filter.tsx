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
import { IApartment, IApartmentFilter, ApartmentType, SpaceType } from "@/services/apartment/payload";
import Radio from "@/components/Inputs/radio/Radio";
import CheckboxTwo from "@/components/Checkboxes/CheckboxTwo";
import dayjs from "dayjs";

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
                  value={filters.hostid}
                  onChange={(ev) => setFilter({ ...filters, hostid: ev.currentTarget.value })}
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
                  value={filters.apartmentid}
                  onChange={(ev) => setFilter({ ...filters, apartmentid: ev.currentTarget.value })}
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
                  value={filters.location}
                  onChange={(ev) => setFilter({ ...filters, location: ev.currentTarget.value })}
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
                  value={filters.facilities}
                  onChange={(ev) => setFilter({ ...filters, facilities: ev.currentTarget.value })}
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
                  value={filters.RoomName}
                  className={`${styles.innerInput}`}
                  onChange={(ev) => setFilter({ ...filters, RoomName: ev.currentTarget.value })}
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
                  value={filters.MaxAdults}
                  onChange={(ev) => setFilter({ ...filters, MaxAdults: ev.currentTarget.value })}
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
                  value={filters.MaxBedRoom}
                  onChange={(ev) => setFilter({ ...filters, MaxBedRoom: ev.currentTarget.value })}
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
                  value={filters.MaxChildren}
                  onChange={(ev) => setFilter({ ...filters, MaxChildren: ev.currentTarget.value })}
                />
                <input
                  placeholder="Service Name"
                  type="date"
                  className={`${styles.innerInput}`}
                  value={filters.MaxGuest}
                  onChange={(ev) => setFilter({ ...filters, MaxGuest: ev.currentTarget.value })}
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
