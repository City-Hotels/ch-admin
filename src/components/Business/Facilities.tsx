import Button from "@/components/Button/Button";
import { H4, P } from "@/components/Headings/Headings";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Img from "@/components/Image/Image";
import Modal from "@/components/Modal/Modal";
import type { IFacility, IHotel } from "@/services/hotel/payload";
import { updateHotelFacilities } from "@/services/hotel";
import { useMutation } from "react-query";
import ToastWrapper from "@/components/toast/Toast";
import { toastIcons } from "@/utils/constants";
import { toast } from "react-hot-toast";
import type { AppDispatch } from "@/store";
import styles from "./Dashboard.module.scss";
import DashBoadFacilityCard from "./DashboardFacilityCard/DashBoardFacilityCard";
import { EditFacilitiesModal } from "../Facilities/EditFacilitiesModal/EditFacilitiesModal";

const Facilities: React.FC<{hotel: IHotel}> = ({hotel}) => {
  // const hotel = useSelector(getStateHotel);
  const facilities = (hotel?.Facilities as IFacility[]) || [];
  const dispatch = useDispatch<AppDispatch>();

  const [selectedFacilities, setSelectedFacilities] = React.useState<
    IFacility[]
  >([]);

  const [editApartmentAmenitiesModal, setEditApartmentAmenitiesModal] =
    React.useState(false);

  const { mutate } = useMutation(updateHotelFacilities);

  const onSubmit = () => {
    mutate(facilities, {
      onSuccess({ message }) {
        toast.success((t) => <ToastWrapper message={message} t={t} />, {
          icon: toastIcons.success
        });
        setSelectedFacilities([]);
        // dispatch(fetchUserHotel());
      }
    });
  };

  useEffect(() => {
    if (selectedFacilities.length > 0) onSubmit();

    return () => { };
  }, [selectedFacilities]);

  return (
    <div className="bg-white px-4 pb-14  pt-5 ">
      <div className={styles.container}>
        <H4 className={styles.adminText}>Facilities</H4>
        <Button size="md" onClick={() => setEditApartmentAmenitiesModal(true)}>
          Add facilities
        </Button>
      </div>

      <div className="grid grid-flow-row grid-cols-2 gap-4 px-4 md:flex md:flex-wrap xl:justify-between xl:px-0">
        {facilities?.map((item) => (
          <DashBoadFacilityCard
            title={item.Label}
            Icon={
              <Img
                path={`${item.Icon}?format=png`}
                name={item.Label}
                className="size-16"
              />
            }
            description={item.Description}
            key={item.Id}
          />
        ))}
        {(!facilities || facilities?.length < 1) && (
          <P>Discover your strengths: Choose facilities that set you apart!</P>
        )}
      </div>
      <Modal
        openModal={editApartmentAmenitiesModal}
        setOpenModal={setEditApartmentAmenitiesModal}
        variant="plain"
      >
        <div>
          <EditFacilitiesModal
            setFacilities={setSelectedFacilities}
            facilities={selectedFacilities}
            onCancel={() => setEditApartmentAmenitiesModal(false)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Facilities;
