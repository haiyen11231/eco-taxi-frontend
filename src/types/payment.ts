export type Card = {
  id: string;
  card_number: string;
  card_holder: string;
  expiry_date: Date;
  cvv: number;
  is_default: boolean;
};
