import React from "react";
import { H4, P } from "@/components/Headings/Headings";
import RoomTypeModal from "@/components/Business/Modals/roomtype/RoomTypemodal";
import Modal from "@/components/Modal/Modal";
import { useQuery } from "react-query";
import queryKeys from "@/utils/api/queryKeys";
import { getRoomTypes } from "@/services/room";
import ButtonLink from "@/components/Button/Link/Link";
import type { IHotel } from "@/services/hotel/payload";
// import { getStateHotel } from "@/store/slice/hotel/hotel.slice";
// import { useSelector } from "react-redux";
import RoomTypeCard from "@/components/Business/RoomTypes";
import styles from "./Dashboard.module.scss";

const RoomTypes: React.FC<{hotel: IHotel}> = ({hotel}) => {
  const [firstModal, setFirstModal] = React.useState(false);
  // const hotel = useSelector(getStateHotel) as IHotel;
  const { data } = useQuery([queryKeys.getRoomType], () =>
    getRoomTypes({ HotelId: hotel.Id, Limit: 6, Page: 1 })
  );

  const roomsTypes = data?.data.RoomTypes;
  const meta = data?.data.Meta;
  return (
    <div className=" bg-white">
      <div className=" px-4 py-7">
        <div className={styles.container}>
          <H4>Room types</H4>
          <ButtonLink size="md" href="/hotel/room-types/new">
            Create room type
          </ButtonLink>
        </div>

        <div className="grid grid-flow-row grid-cols-2 justify-between  gap-5 xl:grid-cols-3">
          {roomsTypes
            ?.filter((_item, index) => index < 6)
            .map((item) => (
              <RoomTypeCard key={item.Id} {...item} hotel={hotel} />
            ))}
        </div>
        {(!roomsTypes || roomsTypes?.length < 1) && (
          <P>You have not created a space</P>
        )}
      </div>
      {roomsTypes && roomsTypes?.length > 0 && (
        <div className=" mt-3 flex items-center justify-center border-t py-4">
          <ButtonLink variant="text" color="text" href={"/hotel/room-types"}>
            See all room types ({meta?.TotalCount})
          </ButtonLink>
        </div>
      )}
      <Modal
        openModal={firstModal}
        setOpenModal={setFirstModal}
        variant="filled"
        className=" w-11/12 overflow-y-scroll md:w-2/3 lg:w-2/4"
      >
        <RoomTypeModal onClose={() => setFirstModal(false)} />
      </Modal>
    </div>
  );
};

export default RoomTypes;
