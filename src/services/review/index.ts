import type { Meta } from "../../utils/api/calls";
import { getRequest, postRequest } from "../../utils/api/calls";
import type {
  IReview,
  IGuestReviewPayload,
  IHostReviewPayload,
  IReviewStatisticsPayload,
  IReviewOnHost,
  IReviewOnGuest
} from "./payload";

const addReview = (data: IReview) => {
  return postRequest({
    url: "/review",
    data
  });
};

const postGuestReviews = (data: IGuestReviewPayload) => {
  return postRequest<IGuestReviewPayload, null>({
    url: "/reviews/guests",
    data
  });
};

const postHostReviews = (data: IHostReviewPayload) => {
  return postRequest<IHostReviewPayload, null>({
    url: "/reviews/hosts",
    data
  });
};

const getBookingReview = (bookingId: string) => {
  return getRequest<IReview>({
    url: `/reviews/${bookingId}`
  });
};

const getReviews = (serviceId: string = "", service: string = "apartment") => {
  return getRequest<{ Reviews: IReview[] }>({
    url: `/reviews/${service}/${serviceId}`
  });
};

const getReviewsOnGuest = (userId: string) => {
  return getRequest<{ Reviews: IReviewOnGuest[] }>({
    url: `/reviews/guests/${userId}`
  });
};

const getReviewsOnHost = (userId: string = "") => {
  return getRequest<{ Reviews: IReviewOnHost[]; Meta: Meta }>({
    url: `/reviews/hosts/${userId}`
  });
};

const getReviewsStatistics = (data: any = {}) => {
  const args = Object.keys(data)
    .map(
      (item) => `${encodeURIComponent(item)}=${encodeURIComponent(data[item])}`
    )
    .join("&");

  return getRequest<IReviewStatisticsPayload>({
    url: `/reviews/statistics?${args}`
  });
};

export {
  getReviews,
  addReview,
  postGuestReviews,
  postHostReviews,
  getBookingReview,
  getReviewsStatistics,
  getReviewsOnGuest,
  getReviewsOnHost
};
