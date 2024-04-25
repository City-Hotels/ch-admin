import CloseIcon from "@/assets//icons/close.svg";
import Button from "@/components/Button/Button";
import { H4, H6, P, P2 } from "@/components/Headings/Headings";
import Modal from "@/components/Modal/Modal";
import Ratings from "@/components/Ratings/Ratings";
import HostReviewItem from "@/components/Reviews/HostReviewItem";
import Avatar from "@/components/Avatar/Avatar";
import { getReviewsOnGuest } from "@/services/review";
import type { IReviewOnGuest } from "@/services/review/payload";
import queryKeys from "@/utils/api/queryKeys";
import React from "react";
import { useQuery } from "react-query";
import styles from "./GuestDetails.module.scss";
import type GuestDetailsProps from "./GuestDetails.props";

const GuestDetails: React.FC<GuestDetailsProps> = ({
  reservation: { Guest, Details }
}) => {
  const [showModal, setShowModal] = React.useState(false);
  const { data } = useQuery(
    [queryKeys.getReviewsOnGuest, Guest.Id],
    () => getReviewsOnGuest(Guest.Id),
    {
      enabled: !!Guest.Id // Would only make this request if slug is truthy
    }
  );

  const reviews = (data?.data.Reviews as IReviewOnGuest[]) || [];

  return (
    <div className={styles.guestDetailsContainer}>
      <H6>Guest reservation details</H6>

      <div className={`${styles.guestProfile}`}>
        <Avatar
          Firstname={Guest?.Firstname}
          Lastname={Guest?.Lastname}
          Imageurl={Guest?.Imageurl}
          className="size-[126px] "
        />

        <div className={`${styles.guestInfo}`}>
          <div>
            <H6>
              {Guest?.Firstname} {Guest?.Lastname}
            </H6>
            <P className="mt-[4px] text-white900">{Guest?.Email}</P>
          </div>

          <Button
            className="mt-4 text-orange500"
            variant="text"
            color="text"
            onClick={() => setShowModal(true)}
          >
            See reviews on guest{" "}
            <span className="text-white900">({reviews.length})</span>
          </Button>
        </div>
      </div>
      <div className={styles.guestAddsOn}>
        <div>
          <P2 className="mb-[2px] text-white800">Adults</P2>
          <P weight="bold" className=" text-[#181A20]">
            {Details?.Adults}
          </P>
        </div>

        <div>
          <P2 className="mb-[2px] text-white800">Children</P2>
          <P weight="bold" className=" text-[#181A20]">
            {Details?.Children || "None"}
          </P>
        </div>

        <div>
          <P2 className="mb-[2px] text-white800">Pets</P2>
          <P weight="bold" className="text-[#181A20]">
            {Details?.Pets || "None"}
          </P>
        </div>
      </div>

      <div className={`${styles.guestSpecialRequest}`}>
        <P weight="bold" className=" mb-[26px] text-[#181A20]">
          Special Request
        </P>

        <P className="text-white900">{Details?.SpecialRequest || "None"}</P>
      </div>

      <Modal openModal={showModal} setOpenModal={setShowModal} variant="filled">
        <div className="min-h-[600px] w-[770px] overflow-y-scroll bg-[#FFF] px-8 pt-9">
          <div className="relative mb-8">
            <H4 className="mb-5 text-[#000]"> Hosts’ Reviews </H4>

            <div className="absolute right-0 top-0 rounded-full bg-[#E8F1FD] p-2">
              <CloseIcon
                onClick={() => setShowModal(false)}
                className="cursor-pointer"
              />
            </div>

            <div className="mt-2 flex items-center gap-1 ">
              <P weight="bold">4.0</P>
              <Ratings rating={1} />
              <P weight="bold" className="whitespace-nowrap">
                {" "}
                • {reviews.length} Reviews
              </P>
            </div>
          </div>

          <div className="">
            {reviews.map((review, index) => (
              <HostReviewItem key={index} review={review} />
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default GuestDetails;
