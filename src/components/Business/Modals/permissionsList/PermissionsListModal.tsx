import { H5 } from "@/components/Headings/Headings";
import React from "react";
import { HOTELPERMISSONS } from "@/utils/constants";
import Checkbox from "@/components/Inputs/checkbox/Checkbox";
import Cancel from "@/assets/icons/cancel.svg";
import Button from "@/components/Button/Button";
import PermissionsListModalProps from "./PermissionsListModalProps";

const PermissionsListModal: React.FC<PermissionsListModalProps> = ({
  closeModal,
  onChange,
  values: value
}) => {
  const toggleItem = (values: string[], item: string) => {
    const index = values.findIndex((val) => val === item);
    if (index > -1) {
      values.splice(index, 1);
    } else values.push(item);
    return values;
  };
  return (
    <div className="relative min-w-full p-5">
      <H5 className="mb-6 text-left font-semibold capitalize text-black md:text-center ">
        Select Permisssions
      </H5>
      <div
        className=" absolute -right-5 top-2 cursor-pointer"
        onClick={() => closeModal()}
      >
        <Cancel />
      </div>
      <div className="mt-20 flex flex-col gap-10">
        <div>
          <div className="mt-5 grid grid-cols-1 gap-y-4">
            {HOTELPERMISSONS.map((permission) => {
              const selected =
                value?.findIndex((item) => item === permission.Name) > -1;

              return (
                <Checkbox
                  key={permission.Id}
                  label={permission.Name}
                  onChange={() => onChange(toggleItem(value, permission.Name))}
                  name="close"
                  value={selected}
                />
              );
            })}
          </div>
          <div className="mt-20 text-end">
            <Button
              color="muted"
              size="sm"
              className="mr-5"
              onClick={() => closeModal()}
            >
              Cancel
            </Button>
            <Button color="primary" onClick={() => closeModal()} size="sm">
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionsListModal;
