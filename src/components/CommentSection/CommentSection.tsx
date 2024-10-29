import { Carousel } from "antd";
import CommentCard, { CommentCardProps } from "../CommentCard/CommentCard";
import styles from "./CommentSection.module.scss";

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
    <Carousel arrows infinite={false} className={styles.commentSection}>
      {Array.from({ length: comments.length - 2 }).map((_, index) => {
        const start = index;
        const end = start + 3;
        const commentSubset = comments.slice(start, end);

        return (
          <div key={index}>
            <div className={styles.cardContainer}>
              {commentSubset.map((item, idx) => (
                <CommentCard
                  name={item.name}
                  description={item.description}
                  rate={item.rate}
                  className={styles.commentCard}
                  key={idx}
                />
              ))}
            </div>
          </div>
        );
      })}
    </Carousel>
    // </div>
  );
};

export default CommentSection;