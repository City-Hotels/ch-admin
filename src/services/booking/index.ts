import type { ApiResponse, Meta } from "../../utils/api/calls";
import { getRequest, patchRequest, postRequest } from "../../utils/api/calls";
import type { BookingFilter, IBooking, IOrder, IReservation } from "./payload";

const createBooking = (data: IOrder) => {
  return postRequest<IOrder, { Id: string } & IOrder>({
    url: "/bookings",
    data
  });
};

const getBookings = (
  filter: BookingFilter
): Promise<
  ApiResponse<{
    Meta: Meta;
    Bookings: IBooking[];
  }>
> => {
  const args = Object.keys(filter)
    .map(
      (item) =>
        `${encodeURIComponent(item)}=${encodeURIComponent(
          (filter as any)[item]
        )}`
    )
    .join("&");
  return getRequest<{ Meta: Meta; Bookings: IBooking[] }>({
    url: `/bookings?${args}`
  });
};

const getBookingDetails = (bookingId: string) => {
  return getRequest<IBooking>({
    url: `/bookings/${bookingId}`
  });
};

const cancelBookings = (bookingId: string) => {
  return patchRequest<null, null>({
    url: `/bookings/${bookingId}/cancel`
  });
};

const getHostReservations = (
  filter: BookingFilter
): Promise<
  ApiResponse<{
    Meta: Meta;
    Bookings: IReservation[];
  }>
> => {
  const args = Object.keys(filter)
    .map(
      (item) =>
        `${encodeURIComponent(item)}=${encodeURIComponent(
          (filter as any)[item]
        )}`
    )
    .join("&");
  return getRequest<{ Meta: Meta; Bookings: IReservation[] }>({
    url: `/reservations?${args}`
  });
};

const getReservationDetails = (bookingId: string) => {
  return getRequest<IReservation>({
    url: `/reservations/${bookingId}`
  });
};

const confrimReservation = (bookingId: string) => {
  return patchRequest<null, null>({
    url: `/reservations/${bookingId}/confirm`
  });
};

const declineReservation = (bookingId: string) => {
  return patchRequest<null, null>({
    url: `/reservations/${bookingId}/decline`
  });
};

export {
  createBooking,
  getBookings,
  getBookingDetails,
  cancelBookings,
  getHostReservations,
  getReservationDetails,
  confrimReservation,
  declineReservation
};
