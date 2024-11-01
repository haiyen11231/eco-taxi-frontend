import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Card } from "../../types/payment";
import { getCardById, getCardList } from "../../services/payment";

type PaymentSlice = {
  cardList: Record<string, Card>;
  cardIdList: string[];
  loading: boolean;
};

const initialState: PaymentSlice = {
  cardList: {},
  cardIdList: [],
  loading: false,
};

const fetchCardList = createAsyncThunk("payment/fetchCardList", () => {
  return getCardList();
});

const fetchCardById = createAsyncThunk(
  "payment/fetchCardById",
  (id: string) => {
    return getCardById(id);
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCardList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCardList.fulfilled, (state, action) => {
        const payload = action.payload;

        state.cardList = payload.reduce((curr, next) => {
          curr[next.id] = next;
          return curr;
        }, {} as Record<number, Card>);
        state.cardIdList = payload.map((item) => item.id);
        state.loading = false;
      })
      .addCase(fetchCardList.rejected, (state) => {
        state.loading = false;
      })

      //   to update card
      .addCase(fetchCardById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCardById.fulfilled, (state, action) => {
        const payload = action.payload;

        state.cardList[payload.id] = payload;
        state.loading = false;
      })
      .addCase(fetchCardById.rejected, (state) => {
        state.loading = false;
      });
  },
});

export { fetchCardList, fetchCardById };
export default paymentSlice.reducer;
