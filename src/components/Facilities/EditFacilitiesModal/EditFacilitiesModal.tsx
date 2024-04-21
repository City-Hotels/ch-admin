import React from "react";
import { H3, H5 } from "@/components/Headings/Headings";

import Button from "@/components/Button/Button";
import type { IFacility } from "@/services/apartment/payload";
import { useQuery } from "react-query";
import queryKeys from "@/utils/api/queryKeys";
import { getAllFacilities } from "@/services/facilities";

import styles from "./EditFacilitiesModal.module.scss";
import FacilityCard from "../FacilityCard/FacilityCard";

export const EditFacilitiesModal: React.FC<{
  facilities: IFacility[];
  setFacilities: (facilities: IFacility[]) => void;
  onCancel: Function;
}> = ({ facilities, setFacilities, onCancel }) => {
  const [selectedFacilities, setSelectedFacilities] = React.useState<
    IFacility[]
  >(facilities?.map((item: IFacility) => item) || []);

  const toggleAmenity = (amenity: IFacility) => {
    const selected = selectedFacilities;
    if (!selected) return;
    const index = selected.findIndex((item) => item.Id === amenity.Id);
    if (index > -1) selected.splice(index, 1);
    else selected.push(amenity);

    setSelectedFacilities([...selected]);
  };

  const save = () => {
    setFacilities([...selectedFacilities]);
    onCancel();
  };

  const { data } = useQuery([queryKeys.getAllFacilities], getAllFacilities);
  const allFacilities = (data?.data?.Facilities as IFacility[]) || [];

  return (
    <div className={styles.amenityContainer}>
      <div className="flex flex-col items-center justify-center text-center">
        <div>
          <H3>Edit Amenities</H3>
        </div>
        <div className={styles.amenityHeading}>
          <div className="mt-[50px] grid grid-flow-row grid-cols-3 gap-3">
            {allFacilities
              .filter((item) => !item.Type)
              .map((type) => (
                <FacilityCard
                  {...type}
                  onSelected={() => toggleAmenity(type)}
                  selected={
                    selectedFacilities &&
                    selectedFacilities?.findIndex(
                      (item) => type.Id === item.Id
                    ) > -1
                  }
                  key={type.Label}
                />
              ))}
          </div>

          <div className="mt-[60px] grid grid-flow-row grid-cols-3 gap-3">
            {allFacilities
              .filter((item) => item.Type === 1)
              .map((type) => (
                <FacilityCard
                  {...type}
                  onSelected={() => toggleAmenity(type)}
                  selected={
                    selectedFacilities &&
                    selectedFacilities?.findIndex(
                      (item) => type.Id === item.Id
                    ) > -1
                  }
                  key={type.Label}
                />
              ))}
          </div>

          <div className="mt-[48px]">
            <H5 className="mb-[20px] text-left">
              Do you have any safety items
            </H5>
            <div className="grid grid-flow-row grid-cols-3 gap-3">
              {allFacilities
                .filter((item) => item.Type === 2)
                .map((type) => (
                  <FacilityCard
                    {...type}
                    onSelected={() => toggleAmenity(type)}
                    selected={
                      selectedFacilities &&
                      selectedFacilities?.findIndex(
                        (item) => type.Id === item.Id
                      ) > -1
                    }
                    key={type.Label}
                  />
                ))}
            </div>
          </div>
        </div>

        <div className={`${styles.ButtonContainer}`}>
          <div className={`${styles.ButtonContainerInner}`}>
            <Button size="sm" color="muted" onClick={() => onCancel()}>
              Cancel
            </Button>
            <Button size="sm" color="primary" onClick={() => save()}>
              Save
            </Button>
          </div>
        </div>
      </div>
      <div className={`${styles.Overlay}`}></div>
    </div>
  );
};
