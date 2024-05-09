import Button from "@/components/shared/button/Button";
import { H3 } from "@/components/shared/headings/Headings";
import Modal from "@/components/shared/modal/Modal";
import UserLayout from "@/layout/user/User";
import { getApartment, updateApartmentFacilities } from "@/services/apartment";
import type { IFacility } from "@/services/apartment/payload";
import queryKeys from "@/utils/api/queryKeys";
import { useRouter } from "next/router";
import React from "react";
import { useMutation, useQuery } from "react-query";
import ToastWrapper from "@/components/shared/toast/Toast";
import { toastIcons } from "@/utils/constants";
import { toast } from "react-hot-toast";
import { SelectFacilities } from "@/components/SelectFacilities/SelectFacilities";
import FacilityDescription from "@/components/SelectFacilities/FacilityDescription";

const EditApartmentFacilities = () => {
  const router = useRouter();
  const [editApartmentAmenitiesModal, setEditApartmentAmenitiesModal] =
    React.useState(false);
  const [facilities, setFacilities] = React.useState<IFacility[]>([]);

  const { slug } = router.query;
  const apartmentId = slug ? slug.toString() : "";

  const { mutate, isLoading } = useMutation((payload: IFacility[]) =>
    updateApartmentFacilities(apartmentId, payload)
  );

  const { isLoading: gettingApartment } = useQuery(
    [queryKeys.getApartmentByID],
    () => {
      const res = getApartment(slug?.toString() || ""
      );
      return res;
    },
    {
      onSuccess: (response) => {
        // Set state based on response
        // eslint-disable-next-line no-console
        setFacilities(response.data.Facilities || []);
      },
      enabled: !!slug // Would only make this request if slug is truthy
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
    <UserLayout>
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
          {gettingApartment && "Loading"}
          {facilities.length < 1 &&
            !gettingApartment &&
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
          <EditAmenitiesModal
            setFacilities={setFacilities}
            facilities={facilities}
            onCancel={() => setEditApartmentAmenitiesModal(false)}
          />
        </div>
      </Modal>
    </UserLayout>
  );
};

export default EditApartmentFacilities;
