import type { FC, ChangeEvent } from "react";
import React, { useEffect, useState } from "react";
import styles from "./Filter.module.scss";
import Close from "@/assets/icons/close.svg";
import Search from "@/assets/icons/search.svg";
import { H4, P2 } from "@/components/Headings/Headings";
import CheckboxTwo from "@/components/Checkboxes/CheckboxTwo";
import FilterProps from "./Filter.props";
import { HotelFilter, HotelStatus } from "@/services/hotel/payload";

const Filter: FC<FilterProps> = ({ className, onClose, setFilter, filter }) => {
  const [filters, updateFilter] = useState<HotelFilter>(filter);

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
              <P2 className="font-bold leading-[150%] text-black">Id</P2>

              <div className={`${styles.input}`}>
                <Search className="text-black" />
                <input
                  placeholder="Id"
                  className={`${styles.innerInput}`}
                  value={filters.Id}
                  onChange={(ev) =>
                    setFilter({ ...filters, Id: ev.currentTarget.value })
                  }
                />
              </div>
            </div>

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
              <P2 className="font-bold leading-[150%] text-black">Telephone</P2>

              <div className={`${styles.input}`}>
                <Search className="text-black" />
                <input
                  placeholder="Telephone"
                  className={`${styles.innerInput}`}
                  value={filters.Telephone}
                  onChange={(ev) =>
                    setFilter({ ...filters, Telephone: ev.currentTarget.value })
                  }
                />
              </div>
            </div>

            <div className={`${styles.labelContainer}`}>
              <P2 className="font-bold leading-[150%] text-black">Email</P2>

              <div className={`${styles.input}`}>
                <Search className="text-black" />
                <input
                  placeholder="Email"
                  className={`${styles.innerInput}`}
                  value={filters.Email}
                  onChange={(ev) =>
                    setFilter({ ...filters, Email: ev.currentTarget.value })
                  }
                />
              </div>
            </div>

            <div className={`${styles.labelContainer}`}>
              <P2 className="font-bold leading-[150%] text-black">Location</P2>

              <div className={`${styles.input}`}>
                <Search className="text-black" />
                <input
                  placeholder="Location"
                  className={`${styles.innerInput}`}
                  value={filters.Location}
                  onChange={(ev) =>
                    setFilter({ ...filters, Location: ev.currentTarget.value })
                  }
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
                  placeholder="Facilities"
                  className={`${styles.innerInput}`}
                  value={filters.Facilities}
                  onChange={(ev) =>
                    setFilter({
                      ...filters,
                      Facilities: ev.currentTarget.value
                    })
                  }
                />
              </div>
            </div>

            <div className={`${styles.labelContainer}`}>
              <P2 className="font-bold leading-[150%] text-black">
                Guest Allowed
              </P2>

              <div className={`${styles.input}`}>
                <Search className="text-black" />
                <input
                  placeholder="Guest Allowed"
                  className={`${styles.innerInput}`}
                  value={filters.GuestAllowed}
                  onChange={(ev) =>
                    setFilter({
                      ...filters,
                      GuestAllowed: ev.currentTarget.value
                    })
                  }
                />
              </div>
            </div>

            <div className={`${styles.labelContainer}`}>
              <P2 className="font-bold leading-[150%] text-black">
                Kids Allowed
              </P2>

              <div className={`${styles.input}`}>
                <Search className="text-black" />
                <input
                  placeholder="Kids Allowed"
                  className={`${styles.innerInput}`}
                  value={filters.KidsAllowed}
                  onChange={(ev) =>
                    setFilter({
                      ...filters,
                      KidsAllowed: ev.currentTarget.value
                    })
                  }
                />
              </div>
            </div>

            <div className="flex items-center w-full justify-between">
              <div className={`${styles.labelContainer} w-2/4`}>
                <P2 className="font-bold leading-[150%] text-black">
                  Max Rating
                </P2>

                <div className={`${styles.input}`}>
                  <Search className="text-black w-7" />
                  <input
                    placeholder="Max Rating"
                    className={`${styles.innerInput}`}
                    value={filters.MaxRating}
                    onChange={(ev) =>
                      setFilter({
                        ...filters,
                        MaxRating: ev.currentTarget.value
                      })
                    }
                  />
                </div>
              </div>

              <div className={`${styles.labelContainer} w-2/4`}>
                <P2 className="font-bold leading-[150%] text-black">
                  Min Rating
                </P2>

                <div className={`${styles.input}`}>
                  <Search className="text-black w-7" />
                  <input
                    placeholder="Min Rating"
                    className={`${styles.innerInput}`}
                    value={filters.MinRating}
                    onChange={(ev) =>
                      setFilter({
                        ...filters,
                        MinRating: ev.currentTarget.value
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center w-full justify-between">
              <div className={`${styles.labelContainer} w-2/4`}>
                <P2 className="font-bold leading-[150%] text-black">
                  Max Total Reviews
                </P2>

                <div className={`${styles.input}`}>
                  <Search className="text-black w-7" />
                  <input
                    placeholder="Max Rating"
                    className={`${styles.innerInput}`}
                    value={filters.MaxTotalReviews}
                    onChange={(ev) =>
                      setFilter({
                        ...filters,
                        MaxTotalReviews: ev.currentTarget.value
                      })
                    }
                  />
                </div>
              </div>

              <div className={`${styles.labelContainer} w-2/4`}>
                <P2 className="font-bold leading-[150%] text-black">
                  Min Total Reviews
                </P2>

                <div className={`${styles.input}`}>
                  <Search className="text-black w-7" />
                  <input
                    placeholder="Min Rating"
                    className={`${styles.innerInput}`}
                    value={filters.MinTotalReviews}
                    onChange={(ev) =>
                      setFilter({
                        ...filters,
                        MinTotalReviews: ev.currentTarget.value
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center w-full justify-between">
              <div className={`${styles.labelContainer} w-2/4`}>
                <P2 className="font-bold leading-[150%] text-black">
                  Max Total Bookings
                </P2>

                <div className={`${styles.input}`}>
                  <Search className="text-black w-7" />
                  <input
                    placeholder="Max Rating"
                    className={`${styles.innerInput}`}
                    value={filters.MaxTotalBooking}
                    onChange={(ev) =>
                      setFilter({
                        ...filters,
                        MaxTotalBooking: ev.currentTarget.value
                      })
                    }
                  />
                </div>
              </div>

              <div className={`${styles.labelContainer} w-2/4`}>
                <P2 className="font-bold leading-[150%] text-black">
                  Min Total Bookings
                </P2>

                <div className={`${styles.input}`}>
                  <Search className="text-black w-7" />
                  <input
                    placeholder="Min Rating"
                    className={`${styles.innerInput}`}
                    value={filters.MinTotalBooking}
                    onChange={(ev) =>
                      setFilter({
                        ...filters,
                        MinTotalBooking: ev.currentTarget.value
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">Status</P2>
              <div className={`${styles.checkBoxConatainer}`}>
                <CheckboxTwo
                  label="All"
                  name="Status"
                  value={"All"}
                  checked={filter.Status === undefined}
                  onChange={(e) => setFilter({ ...filter, Status: undefined })}
                  className="my-4"
                />
                {Object.values(HotelStatus)
                  .filter((value) => typeof value === "string")
                  .map((status) => (
                    <CheckboxTwo
                      name="Status"
                      key={status}
                      label={status as string}
                      value={status}
                      checked={
                        filters.Status ===
                        HotelStatus[status as keyof typeof HotelStatus]
                      }
                      onClick={() => {
                        setFilter({
                          ...filters,
                          Status:
                            HotelStatus[status as keyof typeof HotelStatus]
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
