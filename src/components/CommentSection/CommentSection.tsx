import React from "react";
import { Carousel, Flex } from "antd";
import CommentCard, { CommentCardProps } from "../CommentCard/CommentCard";

const contentStyle = {
  margin: 0,
  //   height: "160px",
  //   color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  //   background: "#364d79",
};

const comments: CommentCardProps[] = [
  {
    name: "Abc Xyz",
    description:
      "This EcoTaxi is very cool, very friendly, fast and very friendly and good service.",
    rate: 5,
  },
  {
    name: "Bcd Xyz",
    description:
      "A very comfortable and safe taxi, with super friendly and clear service at a very affordable price.",
    rate: 5,
  },
  {
    name: "Cde Xyz",
    description:
      "This EcoTaxi is very cool, very friendly, fast and very friendly and good service.",
    rate: 4,
  },
  {
    name: "Def Xyz",
    description:
      "It must have been very comfortable with this EcoTaxi service, cheap, friendly, affordable.",
    rate: 5,
  },
  {
    name: "Efg Xyz",
    description:
      "This EcoTaxi is very cool, very friendly, fast and very friendly and good service.",
    rate: 4,
  },
];

const CommentSection = () => {
  return (
    <>
      <Carousel arrows infinite={false}>
        <div style={contentStyle}>
          {/* <h3 style={contentStyle}> */}
          <Flex gap="middle">
            {comments.map((item, index) => {
              return (
                <CommentCard
                  key={index}
                  name={item.name}
                  description={item.description}
                  rate={item.rate}
                />
              );
            })}
          </Flex>
          {/* </h3> */}
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
      </Carousel>
    </>
  );
};

export default CommentSection;
