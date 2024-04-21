import { P2 } from "@/components/shared/headings/Headings";
import type { IReviewStatisticsPayload } from "@/services/review/payload";
import ProgressBar from "@ramonak/react-progress-bar";
import React from "react";
import styles from "./ReviewStatistics.module.scss";

interface ReviewStatisticsProps {
  reviews: IReviewStatisticsPayload;
}

const ReviewStatistics: React.FC<ReviewStatisticsProps> = ({ reviews }) => {
  const OneStarCount = reviews.OneStarCount || 0;
  const TwoStarCount = reviews.TwoStarCount || 0;
  const ThreeStarCount = reviews.ThreeStarCount || 0;
  const FourStarCount = reviews.FourStarCount || 0;
  const FiveStarCount = reviews.FiveStarCount || 0;

  const totalRattings =
    OneStarCount +
    TwoStarCount +
    ThreeStarCount +
    FourStarCount +
    FiveStarCount;

  return (
    <div className={styles.reviewStats}>
      <div className={styles.reviewRatings}>
        <div className={`${styles.reviewRating}`}>
          <div className="mb-[7px] flex items-center justify-between">
            <P2 className="font-bold text-black">10 - Excellent</P2>
            <P2 className="font-normal text-white900">{FiveStarCount || 0}</P2>
          </div>
          <ProgressBar
            completed={(FiveStarCount / totalRattings) * 100}
            height="7px"
            isLabelVisible={false}
            baseBgColor="#C4C4C4"
            bgColor="#FE8501"
          />
        </div>

        <div className={`${styles.reviewRating}`}>
          <div className="mb-[7px] flex items-center justify-between">
            <P2 className="font-bold text-black">8 - Good</P2>
            <P2 className="font-normal text-white900">{FourStarCount || 0}</P2>
          </div>
          <ProgressBar
            completed={(FourStarCount / totalRattings) * 100}
            height="7px"
            isLabelVisible={false}
            baseBgColor="#C4C4C4"
            bgColor="#FE8501"
          />
        </div>

        <div className={`${styles.reviewRating}`}>
          <div className="mb-[7px] flex items-center justify-between">
            <P2 className="font-bold text-black">6 - Okay</P2>
            <P2 className="font-normal text-white900">{ThreeStarCount || 0}</P2>
          </div>
          <ProgressBar
            completed={(ThreeStarCount / totalRattings) * 100}
            height="7px"
            isLabelVisible={false}
            baseBgColor="#C4C4C4"
            bgColor="#FE8501"
          />
        </div>

        <div className={`${styles.reviewRating}`}>
          <div className="mb-[7px] flex items-center justify-between">
            <P2 className="font-bold text-black">4 - Poor</P2>
            <P2 className="font-normal text-white900">{TwoStarCount || 0}</P2>
          </div>
          <ProgressBar
            completed={(TwoStarCount / totalRattings) * 100}
            height="7px"
            isLabelVisible={false}
            baseBgColor="#C4C4C4"
            bgColor="#FE8501"
          />
        </div>

        <div className={`${styles.reviewRating}`}>
          <div className="mb-[7px] flex items-center justify-between">
            <P2 className="font-bold text-black">2 - Terrible</P2>
            <P2 className="font-normal text-white900">{OneStarCount || 0}</P2>
          </div>
          <ProgressBar
            completed={(OneStarCount / totalRattings) * 100}
            height="7px"
            isLabelVisible={false}
            baseBgColor="#C4C4C4"
            bgColor="#FE8501"
          />
        </div>
      </div>

      <div className={`${styles.reviewSpecifics}`}>
        <div className="flex flex-col items-start justify-between lg:flex-row lg:items-center">
          <P2>Cleaniness</P2>

          <div className="flex items-center gap-[19px]">
            <ProgressBar
              completed={(reviews.Cleaniness / 5) * 100}
              height="7px"
              width="218px"
              isLabelVisible={false}
              baseBgColor="#C4C4C4"
              bgColor="#FE8501"
            />
            <P2 className="text-white900">{Math.round(reviews.Cleaniness)}</P2>
          </div>
        </div>

        <div className="flex gap-3">
          <P2 className="basis-4/5">Value for money</P2>

          <div className=" flex basis-4/5 items-center gap-[19px]">
            <ProgressBar
              completed={(reviews.ValueForMoney / 5) * 100}
              height="7px"
              width="218px"
              isLabelVisible={false}
              baseBgColor="#C4C4C4"
              bgColor="#FE8501"
            />
            <P2 className="text-white900">
              {Math.round(reviews.ValueForMoney)}
            </P2>
          </div>
        </div>
        <div className="flex gap-3">
          <P2 className="basis-4/5">Comfort for money</P2>

          <div className=" flex basis-4/5 items-center gap-[19px]">
            <ProgressBar
              completed={(reviews.Comfort / 5) * 100}
              height="7px"
              width="218px"
              isLabelVisible={false}
              baseBgColor="#C4C4C4"
              bgColor="#FE8501"
            />
            <P2 className="text-white900">{Math.round(reviews.Comfort)}</P2>
          </div>
        </div>

        <div className="flex gap-3">
          <P2 className="basis-4/5">Facilities</P2>

          <div className=" flex basis-4/5 items-center gap-[19px]">
            <ProgressBar
              completed={(reviews.Facility / 5) * 100}
              height="7px"
              width="218px"
              isLabelVisible={false}
              baseBgColor="#C4C4C4"
              bgColor="#FE8501"
            />
            <P2 className="text-white900">{Math.round(reviews.Facility)}</P2>
          </div>
        </div>
        <div className="flex gap-3">
          <P2 className="basis-4/5">Free Wifi</P2>

          <div className=" flex basis-4/5 items-center gap-[19px]">
            <ProgressBar
              completed={(reviews.FreeWifi / 5) * 100}
              height="7px"
              width="218px"
              isLabelVisible={false}
              baseBgColor="#C4C4C4"
              bgColor="#FE8501"
            />
            <P2 className="text-white900">{Math.round(reviews.FreeWifi)}</P2>
          </div>
        </div>
        <div className="flex gap-3">
          <P2 className="basis-4/5">Staff and Service</P2>

          <div className=" flex basis-4/5 items-center gap-[19px]">
            <ProgressBar
              completed={((reviews.Service || 0) / 5) * 100}
              height="7px"
              width="218px"
              isLabelVisible={false}
              baseBgColor="#C4C4C4"
              bgColor="#FE8501"
            />
            <P2 className="text-white900">
              {Math.round(reviews.Service || 0)}
            </P2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStatistics;
