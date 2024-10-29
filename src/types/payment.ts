export type Card = {
  id: number;
  card_number: string;
  card_holder: string;
  expiry_date: Date;
  cvv: number;
  is_default: boolean;
};
