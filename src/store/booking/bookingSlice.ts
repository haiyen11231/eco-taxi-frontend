import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  ConfirmBookingRequest,
  GetBookingHistoryRequest,
  TripBooking,
  UpdateBookingRequest,
} from "../../types/booking";
import { bookingService } from "../../services/booking";
import { authService } from "../../services/auth";
import { addAccessToken } from "../auth/authSlice";
import { AppState } from "..";

type BookingSlice = {
  inCompletedBooking: TripBooking | null;
  firstPageBookingList: TripBooking[];
  loading: boolean;
};

const initialState: BookingSlice = {
  inCompletedBooking: null,
  firstPageBookingList: [],
  loading: false,
};

const confirmBookingAction = createAsyncThunk(
  "/v1/trip/confirm",
  async (
    {
      pickup,
      destination,
      distance,
      fare,
      card_number,
      estimated_arrival_date_time,
      estimated_waiting_time,
      booking_status,
    }: ConfirmBookingRequest,
    thunkAPI
  ) => {
    const state = thunkAPI.getState() as AppState;

    try {
      if (state.auth.accessToken) {
        return await bookingService.confirmBooking(
          pickup,
          destination,
          distance,
          fare,
          card_number,
          estimated_arrival_date_time,
          estimated_waiting_time,
          booking_status,
          state.auth.accessToken
        );
      } else {
        const { access_token } = await authService.refreshToken();
        thunkAPI.dispatch(addAccessToken(access_token));
        return await bookingService.confirmBooking(
          pickup,
          destination,
          distance,
          fare,
          card_number,
          estimated_arrival_date_time,
          estimated_waiting_time,
          booking_status,
          access_token
        );
      }
    } catch (err) {
      const error = err as AxiosError;

      if (error.response && error.response.status === 401) {
        const { access_token } = await authService.refreshToken();
        thunkAPI.dispatch(addAccessToken(access_token));
        return await bookingService.confirmBooking(
          pickup,
          destination,
          distance,
          fare,
          card_number,
          estimated_arrival_date_time,
          estimated_waiting_time,
          booking_status,
          access_token
        );
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const getIncompletedBookingAction = createAsyncThunk(
  "/v1/trip/incompleted-booking",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as AppState;

    try {
      if (state.auth.accessToken) {
        const inCompletedBooking = await bookingService.getIncompletedBooking(
          state.auth.accessToken
        );
        return { inCompletedBooking };
      } else {
        const { access_token } = await authService.refreshToken();
        thunkAPI.dispatch(addAccessToken(access_token));
        const inCompletedBooking = await bookingService.getIncompletedBooking(
          access_token
        );
        return { inCompletedBooking };
      }
    } catch (err) {
      const error = err as AxiosError;

      if (error.response && error.response.status === 401) {
        const { access_token } = await authService.refreshToken();
        thunkAPI.dispatch(addAccessToken(access_token));
        const inCompletedBooking = await bookingService.getIncompletedBooking(
          access_token
        );
        return { inCompletedBooking };
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const updateBookingStatusAction = createAsyncThunk(
  `/v1/trip/`,
  async (
    {
      id,
      pickup,
      destination,
      distance,
      fare,
      card_number,
      estimated_arrival_date_time,
      estimated_waiting_time,
      booking_status,
    }: UpdateBookingRequest,
    thunkAPI
  ) => {
    const state = thunkAPI.getState() as AppState;

    try {
      if (state.auth.accessToken) {
        return await bookingService.updateBookingStatus(
          id,
          pickup,
          destination,
          distance,
          fare,
          card_number,
          estimated_arrival_date_time,
          estimated_waiting_time,
          booking_status,
          state.auth.accessToken
        );
      } else {
        const { access_token } = await authService.refreshToken();
        thunkAPI.dispatch(addAccessToken(access_token));
        return await bookingService.updateBookingStatus(
          id,
          pickup,
          destination,
          distance,
          fare,
          card_number,
          estimated_arrival_date_time,
          estimated_waiting_time,
          booking_status,
          access_token
        );
      }
    } catch (err) {
      const error = err as AxiosError;

      if (error.response && error.response.status === 401) {
        const { access_token } = await authService.refreshToken();
        thunkAPI.dispatch(addAccessToken(access_token));
        return await bookingService.updateBookingStatus(
          id,
          pickup,
          destination,
          distance,
          fare,
          card_number,
          estimated_arrival_date_time,
          estimated_waiting_time,
          booking_status,
          access_token
        );
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const getBookingHistoryAction = createAsyncThunk(
  "/v1/trip/incompleted-booking",
  async (
    { page, limit, booking_statuses, order_asc }: GetBookingHistoryRequest,
    thunkAPI
  ) => {
    const state = thunkAPI.getState() as AppState;

    try {
      if (state.auth.accessToken) {
        const inCompletedBooking = await bookingService.getBookingHistory(
          page,
          limit,
          booking_statuses,
          order_asc,
          state.auth.accessToken
        );
        return { inCompletedBooking };
      } else {
        const { access_token } = await authService.refreshToken();
        thunkAPI.dispatch(addAccessToken(access_token));
        const bookingList = await bookingService.getBookingHistory(
          page,
          limit,
          booking_statuses,
          order_asc,
          access_token
        );
        return { bookingList };
      }
    } catch (err) {
      const error = err as AxiosError;

      if (error.response && error.response.status === 401) {
        const { access_token } = await authService.refreshToken();
        thunkAPI.dispatch(addAccessToken(access_token));
        const bookingList = await bookingService.getBookingHistory(
          page,
          limit,
          booking_statuses,
          order_asc,
          access_token
        );
        return { bookingList };
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // confirm booking
      .addCase(confirmBookingAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(confirmBookingAction.fulfilled, (state, action) => {
        if (action.payload?.result) {
          console.log(action.payload.result);
        }
        state.loading = false;
      })
      .addCase(confirmBookingAction.rejected, (state) => {
        state.loading = false;
      })

      // get incompleted booking
      .addCase(getIncompletedBookingAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getIncompletedBookingAction.fulfilled, (state, action) => {
        const payload = action.payload;
        console.log("Payload: ", payload);

        // check response
        state.inCompletedBooking = payload.inCompletedBooking.trip_booking;
        console.log("State bookings: ", state.inCompletedBooking);
        state.loading = false;
      })
      .addCase(getIncompletedBookingAction.rejected, (state) => {
        state.loading = false;
      })

      // update booking status
      .addCase(updateBookingStatusAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBookingStatusAction.fulfilled, (state, action) => {
        if (action.payload?.result) {
          console.log(action.payload.result);
        }
        state.loading = false;
      })
      .addCase(updateBookingStatusAction.rejected, (state, action) => {
        state.loading = false;
        console.error("Failed to update booking status:", action.payload);
      })

      // get booking history action
      .addCase(getBookingHistoryAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBookingHistoryAction.fulfilled, (state, action) => {
        const payload = action.payload;
        console.log("Payload: ", payload);

        // check response
        if (payload.bookingList?.pagination.current_page === 1) {
          state.firstPageBookingList = payload.bookingList?.result;
        }

        console.log("State bookings: ", state.firstPageBookingList);
        state.loading = false;
      })
      .addCase(getBookingHistoryAction.rejected, (state) => {
        state.loading = false;
      });
  },
});

export {
  confirmBookingAction,
  getIncompletedBookingAction,
  updateBookingStatusAction,
  getBookingHistoryAction,
};
export default bookingSlice.reducer;
