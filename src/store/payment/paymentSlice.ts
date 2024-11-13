import { CreateCardRequest, UpdateCardRequest } from "./../../types/payment";
import { paymentService } from "./../../services/payment";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Card } from "../../types/payment";
// import { getCardById, getCardList } from "../../services/payment";
import { AppState } from "..";
import { authService } from "../../services/auth";
import { addAccessToken } from "../auth/authSlice";
import { AxiosError } from "axios";

type PaymentSlice = {
  // cardList: Record<string, Card>;
  // cardIdList: string[];
  cards: Card[];
  loading: boolean;
};

const initialState: PaymentSlice = {
  // cardList: {},
  // cardIdList: [],
  cards: [],
  loading: false,
};

const getCardsAction = createAsyncThunk("/v1/payment", async (_, thunkAPI) => {
  const state = thunkAPI.getState() as AppState;

  try {
    if (state.auth.accessToken) {
      const cards = await paymentService.getCards(state.auth.accessToken);
      return { cards };
    } else {
      const { access_token } = await authService.refreshToken();
      thunkAPI.dispatch(addAccessToken(access_token));
      const cards = await paymentService.getCards(access_token);
      return { cards };
    }
  } catch (err) {
    const error = err as AxiosError;

    if (error.response && error.response.status === 401) {
      const { access_token } = await authService.refreshToken();
      thunkAPI.dispatch(addAccessToken(access_token));
      const cards = await paymentService.getCards(access_token);
      return cards;
    }
    return thunkAPI.rejectWithValue(error);
  }
});

const createCardAction = createAsyncThunk(
  "/v1/payment/create",
  async (
    {
      card_number,
      card_holder,
      expiry_date,
      cvv,
      is_default,
    }: CreateCardRequest,
    thunkAPI
  ) => {
    const state = thunkAPI.getState() as AppState;

    try {
      if (state.auth.accessToken) {
        return await paymentService.createCard(
          card_number,
          card_holder,
          expiry_date,
          cvv,
          is_default,
          state.auth.accessToken
        );
      } else {
        const { access_token } = await authService.refreshToken();
        thunkAPI.dispatch(addAccessToken(access_token));
        return await paymentService.createCard(
          card_number,
          card_holder,
          expiry_date,
          cvv,
          is_default,
          access_token
        );
      }
    } catch (err) {
      const error = err as AxiosError;

      if (error.response && error.response.status === 401) {
        const { access_token } = await authService.refreshToken();
        thunkAPI.dispatch(addAccessToken(access_token));
        return await paymentService.createCard(
          card_number,
          card_holder,
          expiry_date,
          cvv,
          is_default,
          access_token
        );
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const updateCardAction = createAsyncThunk(
  `/v1/payment/update`,
  async (
    {
      id,
      card_number,
      card_holder,
      expiry_date,
      cvv,
      is_default,
    }: UpdateCardRequest,
    thunkAPI
  ) => {
    const state = thunkAPI.getState() as AppState;

    try {
      if (state.auth.accessToken) {
        return await paymentService.updateCard(
          id,
          card_number,
          card_holder,
          expiry_date,
          cvv,
          is_default,
          state.auth.accessToken
        );
      } else {
        const { access_token } = await authService.refreshToken();
        thunkAPI.dispatch(addAccessToken(access_token));
        return await paymentService.updateCard(
          id,
          card_number,
          card_holder,
          expiry_date,
          cvv,
          is_default,
          access_token
        );
      }
    } catch (err) {
      const error = err as AxiosError;

      if (error.response && error.response.status === 401) {
        const { access_token } = await authService.refreshToken();
        thunkAPI.dispatch(addAccessToken(access_token));
        return await paymentService.updateCard(
          id,
          card_number,
          card_holder,
          expiry_date,
          cvv,
          is_default,
          access_token
        );
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const deleteCardAction = createAsyncThunk(
  `/v1/payment/delete`,
  async (id: number, thunkAPI) => {
    const state = thunkAPI.getState() as AppState;

    try {
      if (state.auth.accessToken) {
        return await paymentService.deleteCard(id, state.auth.accessToken);
      } else {
        const { access_token } = await authService.refreshToken();
        thunkAPI.dispatch(addAccessToken(access_token));
        return await paymentService.deleteCard(id, access_token);
      }
    } catch (err) {
      const error = err as AxiosError;

      if (error.response && error.response.status === 401) {
        const { access_token } = await authService.refreshToken();
        thunkAPI.dispatch(addAccessToken(access_token));
        return await paymentService.deleteCard(id, access_token);
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// const fetchCardList = createAsyncThunk("payment/fetchCardList", () => {
//   return getCardList();
// });

// const fetchCardById = createAsyncThunk(
//   "payment/fetchCardById",
//   (id: string) => {
//     return getCardById(id);
//   }
// );

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // get cards
      .addCase(getCardsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCardsAction.fulfilled, (state, action) => {
        const payload = action.payload;
        console.log("Payload: ", payload);

        state.cards = payload;
        console.log("State cards: ", state.cards);
        state.loading = false;
      })
      .addCase(getCardsAction.rejected, (state) => {
        state.loading = false;
      })

      // create card
      .addCase(createCardAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCardAction.fulfilled, (state, action) => {
        if (action.payload?.result) {
          console.log(action.payload.result);
        }
        state.loading = false;
      })
      .addCase(createCardAction.rejected, (state, action) => {
        state.loading = false;
        console.error("Failed to create card:", action.payload);
      })

      // update card
      .addCase(updateCardAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCardAction.fulfilled, (state, action) => {
        if (action.payload?.result) {
          console.log(action.payload.result);
        }
        state.loading = false;
      })
      .addCase(updateCardAction.rejected, (state, action) => {
        state.loading = false;
        console.error("Failed to update card:", action.payload);
      })

      // delete card
      .addCase(deleteCardAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCardAction.fulfilled, (state, action) => {
        if (action.payload?.result) {
          console.log(action.payload.result);
        }
        state.loading = false;
      })
      .addCase(deleteCardAction.rejected, (state, action) => {
        state.loading = false;
        console.error("Failed to delete user:", action.payload);
      });

    //
    // .addCase(fetchCardList.pending, (state) => {
    //   state.loading = true;
    // })
    // .addCase(fetchCardList.fulfilled, (state, action) => {
    //   const payload = action.payload;

    //   state.cardList = payload.reduce((curr, next) => {
    //     curr[next.id] = next;
    //     return curr;
    //   }, {} as Record<number, Card>);
    //   state.cardIdList = payload.map((item) => item.id);
    //   state.loading = false;
    // })
    // .addCase(fetchCardList.rejected, (state) => {
    //   state.loading = false;
    // })

    // //   to update card
    // .addCase(fetchCardById.pending, (state) => {
    //   state.loading = true;
    // })
    // .addCase(fetchCardById.fulfilled, (state, action) => {
    //   const payload = action.payload;

    //   state.cardList[payload.id] = payload;
    //   state.loading = false;
    // })
    // .addCase(fetchCardById.rejected, (state) => {
    //   state.loading = false;
    // });
  },
});

export { getCardsAction, createCardAction, updateCardAction, deleteCardAction };
export default paymentSlice.reducer;
