import type { FC, ChangeEvent } from "react";
import React, { useEffect, useState } from "react";
import styles from "./Filter.module.scss";
import type FilterProps from "./Filter.props";
import Close from "../../../assets/icons/close.svg";
import Search from "../../../assets/icons/search.svg";
import { H4, P2 } from "@/components/Headings/Headings";
import { IUserFilter, UserRoles } from "@/services/user/payload";
import CheckboxTwo from "@/components/Checkboxes/CheckboxTwo";

const Filter: FC<FilterProps> = ({ className, onClose, setFilter, filter }) => {
  const [filters, updateFilter] = useState<IUserFilter>(filter);

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
              <P2 className="font-bold leading-[150%] text-black">
                First Name
              </P2>

              <div className={`${styles.input}`}>
                <Search className="text-black" />
                <input
                  placeholder="First Name"
                  className={`${styles.innerInput}`}
                  value={filters.Firstname}
                  onChange={(ev) =>
                    setFilter({ ...filters, Firstname: ev.currentTarget.value })
                  }
                />
              </div>
            </div>

            <div className={`${styles.labelContainer}`}>
              <P2 className="font-bold leading-[150%] text-black">Last Name</P2>

              <div className={`${styles.input}`}>
                <Search className="text-black" />
                <input
                  placeholder="Last Name"
                  className={`${styles.innerInput}`}
                  value={filters.Lastname}
                  onChange={(ev) =>
                    setFilter({ ...filters, Lastname: ev.currentTarget.value })
                  }
                />
              </div>
            </div>


            <div className={`${styles.labelContainer}`}>
              <P2 className="font-bold leading-[150%] text-black">
                Telephone Number
              </P2>

              <div className={`${styles.input}`}>
                <Search className="text-black" />
                <input
                  placeholder="Telephone Number"
                  className={`${styles.innerInput}`}
                  value={filters.Telephone}
                  onChange={(ev) =>
                    setFilter({ ...filters, Telephone: ev.currentTarget.value })
                  }
                />
              </div>
            </div>

            <div className={`${styles.labelContainer}`}>
              <P2 className="font-bold leading-[150%] text-black">Country</P2>

              <div className={`${styles.input}`}>
                <Search className="text-black" />
                <input
                  placeholder="Country"
                  className={`${styles.innerInput}`}
                  value={filters.Country}
                  onChange={(ev) =>
                    setFilter({ ...filters, Country: ev.currentTarget.value })
                  }
                />
              </div>
            </div>

            <div className={`${styles.labelContainer}`}>
              <P2 className="font-bold leading-[150%] text-black">State</P2>

              <div className={`${styles.input}`}>
                <Search className="text-black" />
                <input
                  placeholder="State"
                  className={`${styles.innerInput}`}
                  value={filters.State}
                  onChange={(ev) =>
                    setFilter({ ...filters, State: ev.currentTarget.value })
                  }
                />
              </div>
            </div>

            <div className={`${styles.labelContainer}`}>
              <P2 className=" font-bold leading-[150%] text-black">
                User Roles
              </P2>

              <div className={`${styles.checkBoxConatainer}`}>
                {Object.values(UserRoles)
                  .filter((value) => typeof value === "string")
                  .map((userRole) => (
                    <CheckboxTwo
                      name="Role"
                      key={userRole}
                      label={userRole as string}
                      value={userRole}
                      checked={
                        filters.Role ===
                        UserRoles[userRole as keyof typeof UserRoles]
                      }
                      onClick={() => {
                        setFilter({
                          ...filters,
                          Role: UserRoles[userRole as keyof typeof UserRoles]
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
