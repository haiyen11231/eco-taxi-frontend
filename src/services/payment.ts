import axios from "axios";
import {
  Card,
  // Card,
  CreateCardResponse,
  DeleteCardResponse,
  ExpiryDate,
  // GetCardsResponse,
  UpdateCardResponse,
} from "../types/payment";

axios.defaults.withCredentials = true;

export const getCards = async (token: string): Promise<Card[]> => {
  const resp = await axios.get("/v1/payment", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return resp.data;
};

export const createCard = async (
  cardNumber: string,
  cardHolder: string,
  expiryDate: ExpiryDate,
  cvv: number,
  isDefault: boolean,
  token: string
): Promise<CreateCardResponse> => {
  const resp = await axios.post(
    "/v1/payment/create",
    {
      card_number: cardNumber,
      card_holder: cardHolder,
      expiry_date: expiryDate,
      cvv,
      is_default: isDefault,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return resp.data;
};

export const updateCard = async (
  id: number,
  cardNumber: string,
  cardHolder: string,
  expiryDate: ExpiryDate,
  cvv: number,
  isDefault: boolean,
  token: string
): Promise<UpdateCardResponse> => {
  const resp = await axios.patch(
    `/v1/payment/${id}`,
    {
      card_number: cardNumber,
      card_holder: cardHolder,
      expiry_date: expiryDate,
      cvv,
      is_default: isDefault,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return resp.data;
};

export const deleteCard = async (
  id: number,
  token: string
): Promise<DeleteCardResponse> => {
  const resp = await axios.delete(`/v1/payment/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return resp.data;
};

export const paymentService = {
  getCards,
  createCard,
  updateCard,
  deleteCard,
};

// export const getCardList = async (): Promise<Card[]> => {
//   const resp = await axios.get("http://localhost:8082");
//   return resp.data;
// };

// export const getCardById = async (id: string): Promise<Card> => {
//   const resp = await axios.get("http://localhost:8082/" + id);
//   return resp.data;
// };
