import styles from "./Section.module.scss";

type SectionProps = {
  header: string;
  description: string;
  content: React.ReactNode;
  className?: string;
};

const Section: React.FC<SectionProps> = ({
  header,
  description,
  content,
  className,
}) => {
  return (
    <section className={`${styles.section} ${className || ""}`}>
      <h3 className={styles.header}>{header}</h3>
      <p className={styles.description}>{description}</p>
      <div className={styles.content}>{content}</div>
    </section>
  );
};

export default Section;
