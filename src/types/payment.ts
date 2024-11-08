export type Card = {
  id: number;
  card_number: string;
  card_holder: string;
  expiry_date: any;
  cvv: number;
  is_default: boolean;
  user_id: number;
};

export type GetCardsResponse = {
  cards: Card[];
};

// export type CreateCardRequest = {
//   card_number: string;
//   card_holder: string;
//   expiry_date: any;
//   cvv: number;
//   is_default: boolean;
// };

export type CreateCardResponse = {
  result: string;
};

// export type UpdateCardRequest = {
//   card_number: string;
//   card_holder: string;
//   expiry_date: any;
//   cvv: number;
//   is_default: boolean;
// };

export type UpdateCardResponse = {
  result: string;
};

export type DeleteCardResponse = {
  result: string;
};
