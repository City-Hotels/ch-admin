import Button from "@/components/Button/Button";
import { H2, H3, P, P2, P3 } from "@/components/Headings/Headings";
import Img from "@/components/Image/Image";
import Modal from "@/components/Modal/Modal";
import ReviewModal from "@/components/Reviews/ReviewModal";
import { uploadHotelBanner, uploadHotelLogo } from "@/services/hotel";
import { getReviews, getReviewsStatistics } from "@/services/review";
import type {
  IReview,
  IReviewStatisticsPayload
} from "@/services/review/payload";
import { getRooms } from "@/services/room";
import { getBalance } from "@/services/transactions";
import type { AppDispatch } from "@/store";
// import { fetchUserHotel, getStateHotel } from "@/store/slice/hotel/hotel.slice";
import queryKeys from "@/utils/api/queryKeys";
import { formatCurrencyNoSymbol } from "@/utils/helpers";
import Link from "next/link";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import styles from "./SummaryCard.module.scss";
import SummaryCardProps from "./SummaryCard.props";
import BannerForm from "@/components/MediaForm/BannerForm";

const SummaryCard: React.FC<SummaryCardProps> = ({ hotel }) => {
  // const hotel = useSelector(getStateHotel);
  // const dispatch = useDispatch<AppDispatch>();
  const { data } = useQuery([queryKeys.getHotelRooms], () =>
    getRooms({ HotelId: hotel?.Id })
  );
  const totalRooms = data?.data.Meta;

  const { data: bal } = useQuery([queryKeys.getUserBalance], getBalance);

  const balance = bal?.data?.Credit;

  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [showLogoModal, setShowLogoModal] = useState(false);

  const { data: reviewRes } = useQuery(
    [queryKeys.getReviewsStatistics],
    () => getReviews(hotel?.Id || ""),
    {
      enabled: !!hotel?.Id // Would only make this request if slug is truthy
    }
  );

  const reviews = reviewRes?.data.Reviews as IReview[];

  const { data: reviewStatsRes } = useQuery(
    [queryKeys.getReviews],
    () => getReviewsStatistics(hotel?.Id || ""),
    {
      enabled: !!hotel?.Id // Would only make this request if slug is truthy
    }
  );
  const reviewStats = reviewStatsRes?.data as IReviewStatisticsPayload;

  const updateHotelBanner = (banner: FormData, setProgress: Function) => {
    return uploadHotelBanner(banner, setProgress).then(() => {
      // dispatch(fetchUserHotel());
    });
  };

  const updateHotelLogo = (banner: FormData, setProgress: Function) => {
    return uploadHotelLogo(banner, setProgress).then(() => {
      // dispatch(fetchUserHotel());
    });
  };

  return (
    <div className={styles.SummaryCardContainer}>
      <Img
        path={hotel?.Banner ? hotel?.Banner.Path : ""}
        name="summary card"
        className={styles.SummaryCardImage}
      />
      <div className={styles.Container}>
        <div className={styles.EditBanner}>
          <Button
            color="text"
            variant="text"
            className="bg-transparent"
            onClick={() => setShowBannerModal(true)}
          >
            <P3 className="bg-transparent text-white">update banner</P3>
          </Button>
        </div>
      </div>

      <div className={styles.HotelProfileContainer}>
        <div className={styles.LogoContainer}>
          <Img
            path={hotel?.Logo?.Path || ""}
            name="hotel pic"
            className="m-auto size-[20] rounded-full md:h-[133px] md:w-[131px]"
          />
          <div
            className={styles.UpdateLogo}
            onClick={() => setShowLogoModal(true)}
          >
            Change logo
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div>
            <H3 className="mb-2 text-[white]">{hotel?.Name}</H3>
            <P className="text-[white]">{hotel?.Slogan}</P>

            <div className={styles.SocialLinks}>
              {/* <FaFacebookF className="cursor-pointer hover:text-primary400" /> */}

              {/* <AiOutlineTwitter className="cursor-pointer hover:text-primary400" /> */}

              {/* <AiOutlineInstagram className="cursor-pointer hover:text-primary400" /> */}

              {/* <TfiPinterest className="cursor-pointer hover:text-primary400" /> */}
            </div>
          </div>
          <Link
            href={"/hotel/manage/hotel-information"}
            className="mt-1 rounded-full bg-[#FFF] p-[7px] hover:bg-primary400"
          >
            {/* <BsFillPencilFill className="cursor-pointer text-primary400 hover:text-[#FFF]" /> */}
          </Link>
        </div>
      </div>

      <div className={styles.InfoContainer}>
        <div>
          <P2 className="mb-2 text-[#F4F4F4]">Rooms</P2>
          <Link href={"hotel/rooms"}>
            <H2 className=" text-white"> {totalRooms?.TotalCount}</H2>
          </Link>
        </div>

        <div>
          <P2 className="mb-2 text-[#F4F4F4]">Total Bookings</P2>
          <Link href={"hotel/bookings"}>
            <H2 className=" text-white">{hotel?.Rating?.TotalBooking || 0}</H2>
          </Link>
        </div>

        <div>
          <P2 className="mb-2 text-[#F4F4F4]">Reviews</P2>
          <Button
            variant="text"
            color="text"
            onClick={() => setShowReviewsModal(true)}
          >
            <H2 className=" text-white">{hotel?.Rating?.TotalReviews || 0}</H2>
          </Button>
        </div>

        <div>
          <P2 className="mb-2 text-[#F4F4F4]">Earnings this month</P2>
          <Link href={"hotel/manage/earnings"}>
            <H2 className=" text-white">
              &#36;{formatCurrencyNoSymbol(balance || 0)}
            </H2>
          </Link>
        </div>
      </div>

      <div className={styles.InfoContainerMobile}>
        <div>
          <P2 className="mb-2 font-normal text-[#F4F4F4]">Rooms</P2>
          <P className="text-[28px] font-black text-white">
            {totalRooms?.TotalCount}
          </P>
        </div>

        <div>
          <P2 className="mb-2 font-normal text-[#F4F4F4]">Total Bookings</P2>
          <P className="text-[28px] font-black text-white">
            {/* {hotel?.Rating?.TotalBooking || 0} */}
          </P>
        </div>

        <div>
          <P2 className="mb-2 font-normal text-[#F4F4F4]">Visit</P2>
          <P className="text-[28px] font-black text-white">192</P>
        </div>

        <div>
          <P2 className="mb-2 font-normal text-[#F4F4F4]">
            Earnings this month
          </P2>
          <P className="text-[28px] font-black text-white">
            &#36;{formatCurrencyNoSymbol(balance || 0)}
          </P>
        </div>
      </div>
      <Modal
        openModal={showReviewsModal}
        setOpenModal={setShowReviewsModal}
        variant="filled"
      >
        <div className="">
          <ReviewModal
            onClose={() => setShowReviewsModal(false)}
            reviews={reviews || []}
            reviewStats={reviewStats || {}}
          />
        </div>
      </Modal>
      <Modal
        openModal={showBannerModal}
        setOpenModal={setShowBannerModal}
        variant="plain"
      >
        <div className="w-full bg-white p-5 lg:w-[800px]">
          <BannerForm
            onSubmit={updateHotelBanner}
            previousBanner={hotel?.Banner?.Path}
          />
        </div>
      </Modal>
      <Modal
        openModal={showLogoModal}
        setOpenModal={setShowLogoModal}
        variant="plain"
      >
        <div className="w-full bg-white p-5 lg:w-[800px]">
          <BannerForm
            onSubmit={updateHotelLogo}
            previousBanner={hotel?.Banner?.Path}
          />
        </div>
      </Modal>
    </div>
  );
};

export default SummaryCard;
