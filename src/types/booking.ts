export enum BookingStatus {
  INCOMPLETED,
  COMPLETED,
  CANCELED,
}

export type EstimatedArrivalDateTime = {
  seconds: number;
  nanos: 0;
};

export type TripBooking = {
  id: string;
  pickup: string;
  destination: string;
  distance: number;
  fare: number;
  card_number: string;
  estimated_arrival_date_time: string;
  estimated_waiting_time: number;
  booking_status: BookingStatus;
  user_id: number;
};

export type SearchTripPreviewRequest = {
  pickup: string;
  destination: string;
};

export type SearchTripPreviewResponse = {
  pickup: string;
  destination: string;
  distance: number;
  fare: number;
  estimated_arrival_date_time: string;
  estimated_waiting_time: number;
  num_of_available_taxis: number;
  nearest_taxi_coordinates: number[];
};

export type ConfirmBookingRequest = {
  pickup: string;
  destination: string;
  distance: number;
  fare: number;
  card_number: string;
  estimated_arrival_date_time: string;
  estimated_waiting_time: number;
  booking_status: BookingStatus;
};

export type ConfirmBookingResponse = {
  result: string;
};

export type GetIncompletedBookingResponse = {
  trip_booking: TripBooking;
};

// For cancelling or completed in UpdateBookingRequest
export type UpdateBookingRequest = {
  id: string;
  pickup: string;
  destination: string;
  distance: number;
  fare: number;
  card_number: string;
  estimated_arrival_date_time: string;
  estimated_waiting_time: number;
  booking_status: BookingStatus;
};

export type UpdateBookingResponse = {
  result: string;
};

export type Pagination = {
  current_page: number;
  prev_page: number;
  next_page: number;
  total_page: number;
};

export type GetBookingHistoryRequest = {
  page: number;
  limit: number;
  // Filters
  booking_statuses: BookingStatus[]; // List of booking statuses to filter by

  // Sorting
  order_asc: boolean; // If true, order by ascending date; if false, order by descending
};

export type GetBookingHistoryResponse = {
  pagination: Pagination;
  result: TripBooking[];
};
