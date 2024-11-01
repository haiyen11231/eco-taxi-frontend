import axios from "axios";
import { Card } from "../types/payment";

export const getCardList = async (): Promise<Card[]> => {
  const resp = await axios.get("http://localhost:8082");
  return resp.data;
};

export const getCardById = async (id: string): Promise<Card> => {
  const resp = await axios.get("http://localhost:8082/" + id);
  return resp.data;
};
