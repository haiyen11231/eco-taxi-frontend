import React from "react";
import { Avatar, Card } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const { Meta } = Card;

export type CommentCardProps = {
  name: string;
  description: string;
  rate: number;
};

export type CommentBodyProps = {
  description: string;
  rate: number;
};

const CommentBody: React.FC<CommentBodyProps> = ({ description, rate }) => {
  return (
    <div>
      <p>{description}</p>
      <div>
        {[...Array(5)].map((_, index) => (
          <FontAwesomeIcon
            key={index}
            icon={faStar}
            style={{ color: index < rate ? "#FFD43B" : "#ddd" }}
          />
        ))}
      </div>
    </div>
  );
};

const CommentCard: React.FC<CommentCardProps> = ({
  name,
  description,
  rate,
}) => {
  return (
    <Card style={{ width: 300 }}>
      <Meta
        avatar={
          <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
        }
        title={name}
        description=<CommentBody description={description} rate={rate} />
      />
    </Card>
  );
};

export default CommentCard;
