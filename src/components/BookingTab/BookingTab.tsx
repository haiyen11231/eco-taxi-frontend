import React, { useState } from "react";
import { Button, message, Steps, theme } from "antd";
import SearchTrip from "../SearchTrip/SearchTrip";
import BookTrip from "../BookTrip/BookTrip";

const BookingTab = () => {
  // const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "Search Trip",
      content: <SearchTrip next={next} />,
    },
    {
      title: "Book Trip",
      content: <BookTrip prev={prev} />,
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  // const contentStyle: React.CSSProperties = {
  //   lineHeight: "260px",
  //   textAlign: "center",
  //   color: token.colorTextTertiary,
  //   backgroundColor: token.colorFillAlter,
  //   borderRadius: token.borderRadiusLG,
  //   border: `1px dashed ${token.colorBorder}`,
  //   marginTop: 16,
  // };
  return (
    <>
      <Steps current={current} items={items} />
      {/* <div style={contentStyle}>{steps[current].content}</div> */}
      <div>{steps[current].content}</div>
      {/* <div> */}
      {/* {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Preview
          </Button>
        )} */}
      {/* {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Confirm Ride
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Search Trip
          </Button>
        )} */}
      {/* </div> */}
    </>
  );
};

export default BookingTab;
