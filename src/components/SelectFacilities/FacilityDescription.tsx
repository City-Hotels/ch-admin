import ChevronDownIcon from "@/assets/icons/chevron-down.svg";
import Button from "@/components/Button/Button";
import { H6 } from "@/components/Headings/Headings";
import React, { useState, type ChangeEvent } from "react";
import type AmenitiesProps from "./FacilityDescription.props";
import styles from "./AmenitiesDescription.module.scss";
import Img from "../Image/Image";

const FacilityDescription: React.FC<AmenitiesProps> = ({
  Icon,
  Label,
  Description,
  onUpdateDescription
}) => {
  const [openDropDown, SetOpenDropDown] = useState(false);
  const [textareaValue, setTextAreaValue] = useState(Description);

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newTextAreaValue = event.target.value;
    if (newTextAreaValue.length <= 300) {
      setTextAreaValue(newTextAreaValue);
    }
  };

  return (
    <div className="md:px-3">
      <div className={styles.amenitiesDropDown}>
        <div
          className={`${styles.amenity}`}
          onClick={() => SetOpenDropDown(!openDropDown)}
        >
          <div className="flex items-center gap-5">
            <Img
              path={`${Icon}?format=webp`}
              name={Label}
              className="size-10"
            />
            <H6 className="text-white900">{Label}</H6>
          </div>

          <ChevronDownIcon
            className={openDropDown ? "rotate-180" : "rotate-0"}
          />
        </div>
      </div>

      {openDropDown && (
        <div className="relative h-52 border border-grey30 p-3 md:w-[500px] lg:w-[663px] lg:px-6 lg:pt-8">
          <textarea
            className="h-28 w-full resize-none outline-none"
            placeholder="Write description"
            value={textareaValue}
            onChange={handleTextAreaChange}
          />

          <Button
            size="sm"
            color="primary"
            className="absolute bottom-3 right-3 md:bottom-6 md:right-8"
            disabled={Description === textareaValue}
            onClick={() => onUpdateDescription(textareaValue || "")}
          >
            Save
          </Button>
        </div>
      )}
    </div>
  );
};

export default FacilityDescription;
