import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../store";
import PaymentCard from "../PaymentCard/PaymentCard";
import { useCardSelector } from "../../store/payment/selector";

const ConnectedPaymentCard: React.FC<{ id: string }> = ({ id }) => {
  const card = useCardSelector(id);

  if (!card) return null;
  return (
    <PaymentCard
      key={card.id}
      id={card.id}
      card_number={card.card_number}
      card_holder={card.card_holder}
      expiry_date={card.expiry_date}
      cvv={card.cvv}
      is_default={card.is_default}
    />
  );
};

export default ConnectedPaymentCard;
