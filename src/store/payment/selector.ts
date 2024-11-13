import { useSelector } from "react-redux";
import { AppState } from "..";

export const usePaymentLoadingSelector = () =>
  useSelector((state: AppState) => state.payment.loading);

export const useCardsSelector = () =>
  useSelector((state: AppState) => state.payment.cards);

// export const useCardIdsSelector = () =>
//   useSelector((state: AppState) => state.payment.cardIdList);

// export const useCardSelector = (id: string) =>
//   useSelector((state: AppState) => state.payment.cardList[id]);
