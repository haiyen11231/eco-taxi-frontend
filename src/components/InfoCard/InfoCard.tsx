import React from "react";
import { Button, Descriptions } from "antd";
import type { DescriptionsProps } from "antd";

const items: DescriptionsProps["items"] = [
  {
    key: "1",
    label: "Name",
    children: "John Doe",
  },
  {
    key: "2",
    label: "Phone Number",
    children: "35907312",
  },
  {
    key: "3",
    label: "Email",
    children: "ahihi@gmail.com",
  },
  {
    key: "4",
    label: "Distance Travelled",
    children: "80.00 km",
  },
];

const InfoCard = () => {
  return (
    <div>
      <Descriptions
        title="Personal Infomation"
        size="default"
        extra={<Button type="primary">Edit</Button>}
        items={items}
      />
    </div>
  );
};

export default InfoCard;
