import React from "react";
import { AppState, DispatchApp } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import PaymentCard from "../PaymentCard/PaymentCard";

const PaymentTab = () => {
  const dispatch: DispatchApp = useDispatch();
  const isLoading = useSelector((state: AppState) => state.payment.loading);
  const cards = useSelector((state: AppState) => state.payment.cardList);

  return (
    <Spin tip="Loading..." spinning={isLoading}>
      {/* <div>PaymentTab</div> */}
      <PaymentCard />
    </Spin>
  );
};

export default PaymentTab;
