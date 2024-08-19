import type { FC } from "react";
import React, { useEffect, useState } from "react";

import styles from "./Filter.module.scss";
import type FilterProps from "./Filter.props";
import Close from "../../../assets/icons/close.svg";
import Search from "../../../assets/icons/search.svg";
import { H4, P2 } from "@/components/Headings/Headings";
import { IApartmentFilter, ApartmentType, ApartmentStatus, FilterApartmentStatus, FilterSpaceType } from "@/services/apartment/payload";

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
                Apartment Name
              </P2>

              <div className={`${styles.input}`}>
                <Search className="text-black" />
                <input
                  placeholder="search by apartment name"
                  className={`${styles.innerInput}`}
                  value={filters.ApartmentName}
                  onChange={(ev) => setFilter({ ...filters, ApartmentName: ev.currentTarget.value })}
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
                  placeholder="maxadult"
                  type="number"
                  value={filters.MaxAdults}
                  className={`${styles.innerInput}`}
                  onChange={(ev) => setFilter({ ...filters, MaxAdults: parseInt(ev.currentTarget.value) })}
                />
              </div>
            </div>


            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">
                Max Children
              </P2>

              <div className={`${styles.input}`}>
                <input
                  placeholder="maxchildren"
                  type="number"
                  className={`${styles.innerInput}`}
                  value={filters.MaxChildren}
                  onChange={(ev) => setFilter({ ...filters, MaxChildren: parseInt(ev.currentTarget.value) })}
                />
              </div>
            </div>
            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">
                Max Bedroom
              </P2>

              <div className={`${styles.input}`}>
                <input
                  placeholder="maxbedroom"
                  type="number"
                  className={`${styles.innerInput}`}
                  value={filters.MaxBedRoom}
                  onChange={(ev) => setFilter({ ...filters, MaxBedRoom: parseInt(ev.currentTarget.value) })}
                />
              </div>
            </div>
            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">
                Bed Count
              </P2>

              <div className={`${styles.input}`}>
                <input
                  placeholder="bedcount"
                  type="number"
                  className={`${styles.innerInput}`}
                  value={filters.BedCount}
                  onChange={(ev) => setFilter({ ...filters, BedCount: parseInt(ev.currentTarget.value) })}
                />
              </div>
            </div>
            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">
                Max Guest
              </P2>

              <div className={`${styles.input}`}>
                <input
                  placeholder="maxguest"
                  type="number"
                  className={`${styles.innerInput}`}
                  value={filters.MaxGuest}
                  onChange={(ev) => setFilter({ ...filters, MaxGuest: parseInt(ev.currentTarget.value) })}
                />
              </div>
            </div>
            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">
                Dimension
              </P2>

              <div className={`${styles.input}`}>
                <input
                  placeholder="dimension"
                  type="number"
                  className={`${styles.innerInput}`}
                  value={filters.Dimension}
                  onChange={(ev) => setFilter({ ...filters, Dimension: parseFloat(ev.currentTarget.value) })}
                />
              </div>
            </div>
            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">
                CarPark
              </P2>

              {/* <div className={`${styles.input}`}>
                <input
                  placeholder=""
                  type="boolean"
                  className={`${styles.innerInput}`}
                  value={filters.CarPark}
                  onChange={(ev) => setFilter({ ...filters, CarPark: ev.currentTarget.value })}
                />
              </div> */}
            </div>
            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">
                Bath Rooms
              </P2>

              <div className={`${styles.input}`}>
                <input
                  placeholder="number of bathrooms"
                  type="number"
                  className={`${styles.innerInput}`}
                  value={filters.BathCount}
                  onChange={(ev) => setFilter({ ...filters, BathCount: parseInt(ev.currentTarget.value) })}
                />
              </div>
            </div>
            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">
                Price
              </P2>

              <div className={`${styles.input} flex gap-3`}>
                <input
                  placeholder="Min Rate"
                  type="number"
                  value={filters.MinPrice}
                  className={`${styles.innerInput}`}
                  onChange={(ev) => setFilter({ ...filters, MinPrice: parseFloat(ev.currentTarget.value) })}
                />
                <input
                  placeholder="Max Rate"
                  type="number"
                  className={`${styles.innerInput}`}
                  value={filters.MaxPrice}
                  onChange={(ev) => setFilter({ ...filters, MaxPrice: parseFloat(ev.currentTarget.value) })}
                />
              </div>
            </div>
            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">
                Nightly Range
              </P2>

              <div className={`${styles.input} flex gap-3`}>
                <input
                  placeholder="Min Nightly Rate"
                  type="number"
                  value={filters.MinNightlyPrice}
                  className={`${styles.innerInput}`}
                  onChange={(ev) => setFilter({ ...filters, MinNightlyPrice: parseFloat(ev.currentTarget.value) })}
                />
                <input
                  placeholder="Max Nightly Rate"
                  type="number"
                  className={`${styles.innerInput}`}
                  value={filters.MaxNightlyPrice}
                  onChange={(ev) => setFilter({ ...filters, MaxNightlyPrice: parseFloat(ev.currentTarget.value) })}
                />
              </div>
            </div>
            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">
                Weekly Range
              </P2>

              <div className={`${styles.input} flex gap-3`}>
                <input
                  placeholder="Min Weekly Rate"
                  type="number"
                  value={filters.MinWeeklyRate}
                  className={`${styles.innerInput}`}
                  onChange={(ev) => setFilter({ ...filters, MinWeeklyRate: parseFloat(ev.currentTarget.value) })}
                />
                <input
                  placeholder="Max Weekly Rate"
                  type="number"
                  className={`${styles.innerInput}`}
                  value={filters.MaxWeeklyRate}
                  onChange={(ev) => setFilter({ ...filters, MaxWeeklyRate: parseFloat(ev.currentTarget.value) })}
                />
              </div>
            </div>
            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">
                Monthly Range
              </P2>

              <div className={`${styles.input} flex gap-3`}>
                <input
                  placeholder="Min Monthly Rate"
                  type="number"
                  value={filters.MinMonthlyRate}
                  className={`${styles.innerInput}`}
                  onChange={(ev) => setFilter({ ...filters, MinMonthlyRate: parseFloat(ev.currentTarget.value) })}
                />
                <input
                  placeholder="Max Monthly Rate"
                  type="number"
                  className={`${styles.innerInput}`}
                  value={filters.MaxMonthlyRate}
                  onChange={(ev) => setFilter({ ...filters, MaxMonthlyRate: parseFloat(ev.currentTarget.value) })}
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
                  placeholder=""
                  type="date"
                  className={`${styles.innerInput}`}
                  value={filters.CheckOutDate}
                  onChange={(ev) => setFilter({ ...filters, CheckOutDate: ev.currentTarget.value })}
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
                  name="status"
                  value={'All'}
                  checked={filter.Status === undefined}
                  onChange={(e) => setFilter({ ...filter, Status: undefined })}
                  className="my-4"
                />
                {Object.values(FilterApartmentStatus)
                  .filter((value) => typeof value === "string")
                  .map((status) => (<CheckboxTwo
                    name="status"
                    key={status}
                    label={status as string}
                    value={status}
                    checked={filters.Status === FilterApartmentStatus[status as keyof typeof FilterApartmentStatus]}
                    onClick={() => {
                      setFilter({ ...filters, Status: FilterApartmentStatus[status as keyof typeof FilterApartmentStatus] })
                    }}
                    className="my-4"
                  />))}
              </div>
            </div>
            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">
                Space Type
              </P2>

              <div className={`${styles.checkBoxConatainer}`}>
                <CheckboxTwo
                  label="All"
                  name="space"
                  value={'All'}
                  checked={filter.Status === undefined}
                  onChange={(e) => setFilter({ ...filter, Status: undefined })}
                  className="my-4"
                />
                {Object.values(FilterSpaceType)
                  .filter((value) => typeof value === "string")
                  .map((space) => (<CheckboxTwo
                    name="space"
                    key={space}
                    label={space as string}
                    value={space}
                    checked={filters.Space === FilterSpaceType[space as keyof typeof FilterSpaceType]}
                    onClick={() => {
                      setFilter({ ...filters, Space: FilterSpaceType[space as keyof typeof FilterSpaceType] })
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
