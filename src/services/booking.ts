import axios from "axios";
import {
  BookingStatus,
  ConfirmBookingResponse,
  GetBookingHistoryResponse,
  GetIncompletedBookingResponse,
  SearchTripPreviewResponse,
  UpdateBookingResponse,
} from "../types/booking";

axios.defaults.withCredentials = true;

export const searchTripPreview = async (
  pickup: string,
  destination: string
): Promise<SearchTripPreviewResponse> => {
  const resp = await axios.post("/v1/trip", {
    pickup,
    destination,
  });

  return resp.data;
};

export const confirmBooking = async (
  pickup: string,
  destination: string,
  distance: number,
  fare: number,
  cardNumber: string,
  estimatedArrivalDateTime: string,
  estimatedWaitingTime: number,
  bookingStatus: BookingStatus,
  token: string
): Promise<ConfirmBookingResponse> => {
  const resp = await axios.post(
    "/v1/trip/confirm",
    {
      pickup,
      destination,
      distance,
      fare,
      card_number: cardNumber,
      estimated_arrival_date_time: estimatedArrivalDateTime,
      estimated_waiting_time: estimatedWaitingTime,
      booking_status: bookingStatus,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return resp.data;
};

export const getIncompletedBooking = async (
  token: string
): Promise<GetIncompletedBookingResponse> => {
  const resp = await axios.get("/v1/trip/incompleted-booking", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return resp.data;
};

export const updateBookingStatus = async (
  id: string,
  pickup: string,
  destination: string,
  distance: number,
  fare: number,
  cardNumber: string,
  estimatedArrivalDateTime: string,
  estimatedWaitingTime: number,
  bookingStatus: BookingStatus,
  token: string
): Promise<UpdateBookingResponse> => {
  const resp = await axios.patch(
    `/v1/trip/${id}`,
    {
      id,
      pickup,
      destination,
      distance,
      fare,
      card_number: cardNumber,
      estimated_arrival_date_time: estimatedArrivalDateTime,
      estimated_waiting_time: estimatedWaitingTime,
      booking_status: bookingStatus,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return resp.data;
};
//
export const getBookingHistory = async (
  page: number,
  limit: number,
  // Filters
  booking_statuses: BookingStatus[], // List of booking statuses to filter by

  // Sorting
  order_asc: boolean,
  token: string
): Promise<GetBookingHistoryResponse> => {
  const resp = await axios.get("/v1/trip/history", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page,
      limit,
      booking_statuses: booking_statuses.join(","), // Convert array to comma-separated string
      order_asc,
    },
  });

  return resp.data;
};

export const bookingService = {
  searchTripPreview,
  confirmBooking,
  getIncompletedBooking,
  updateBookingStatus,
  getBookingHistory,
};
