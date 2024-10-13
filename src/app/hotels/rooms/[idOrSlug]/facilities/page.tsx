"use client"
import { getApartment,  } from "@/services/apartment";
import type { IFacility } from "@/services/apartment/payload";
import queryKeys from "@/utils/api/queryKeys";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { toastIcons } from "@/utils/constants";
import { toast } from "react-hot-toast";
import { SelectFacilities } from "@/components/SelectFacilities/SelectFacilities";
import FacilityDescription from "@/components/SelectFacilities/FacilityDescription";
import ToastWrapper from "@/components/toast/Toast";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { H3 } from "@/components/Headings/Headings";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import { EditFacilitiesModal } from "@/components/Facilities/EditFacilitiesModal/EditFacilitiesModal";
import { getRoom, updateRoomFacilities } from "@/services/room";

const EditRoomFacilities = () => {
  const router = useRouter();
  const [editApartmentAmenitiesModal, setEditApartmentAmenitiesModal] =
    React.useState(false);
  const [facilities, setFacilities] = React.useState<IFacility[]>([]);
  const { idOrSlug } = useParams<{ idOrSlug: string }>();
  const roomid = idOrSlug ? idOrSlug.toString() : "";

  const { mutate, isLoading } = useMutation((payload: IFacility[]) =>
    updateRoomFacilities(roomid, payload)
  );

  const { isLoading: gettingRoom } = useQuery(
    [queryKeys.getApartmentByID],
    () => {
      const res = getRoom(idOrSlug?.toString() || "");
      return res;
    },
    {
      onSuccess: (response) => {
        // Set state based on response
        // eslint-disable-next-line no-console
        setFacilities(response.data.Facilities || []);
      },
      enabled: !!idOrSlug // Would only make this request if slug is truthy
    }
  );

  const handleDescriptionInput = (facility: IFacility) => {
    const allFacilities = [...facilities];
    const index = allFacilities.findIndex((item) => item.Id === facility.Id);
    allFacilities[index] = facility;
    setFacilities([...allFacilities]);
  };

  const onSubmit = () => {
    mutate(facilities, {
      onSuccess({ message }) {
        toast.success((t) => <ToastWrapper message={message} t={t} />, {
          icon: toastIcons.success
        });
      }
    });
  };

  return (
    <DefaultLayout>
      <div className=" max-w-[662px]">
        <div className="mb-10 flex justify-between">
          <H3>Edit Facilities</H3>
          <Button
            color="text"
            size="sm"
            onClick={() => setEditApartmentAmenitiesModal(true)}
          >
            Add more
          </Button>
        </div>
        <div className="flex flex-col gap-4 pr-5">
          {gettingRoom && "Loading"}
          {facilities.length < 1 &&
            !gettingRoom &&
            "You have not selected any facility for this listing"}
          {facilities.map((facility, index) => (
            <FacilityDescription
              {...facility}
              key={index}
              onUpdateDescription={(description: string) =>
                handleDescriptionInput({
                  ...facility,
                  Description: description
                })
              }
            />
          ))}
        </div>
        <div className="my-11 flex justify-end gap-3">
          <Button size="sm" color="muted">
            Cancel
          </Button>
          <Button
            size="sm"
            color="primary"
            isLoading={isLoading}
            onClick={onSubmit}
          >
            Save
          </Button>
        </div>
      </div>
      <Modal
        openModal={editApartmentAmenitiesModal}
        setOpenModal={setEditApartmentAmenitiesModal}
        variant="plain"
      >
        <div>
          <EditFacilitiesModal
            setFacilities={setFacilities}
            facilities={facilities}
            onCancel={() => setEditApartmentAmenitiesModal(false)}
          />
        </div>
      </Modal>
    </DefaultLayout>
  );
};

export default EditRoomFacilities;
