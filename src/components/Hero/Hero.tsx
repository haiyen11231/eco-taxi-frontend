import { Link } from "react-router-dom";
import styles from "./Hero.module.scss";

const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <figure className={styles.heroImageContainer}>
        <img
          src="/src/assets/hero_banner.png"
          alt=""
          className={styles.heroImage}
        />
      </figure>
      <div className={styles.heroContent}>
        <blockquote className={styles.heroQuote}>
          <h1 className={styles.quoteText}>
            Ride <span className={styles.quoteTextPrimary}>Green</span>
          </h1>
          <h1 className={styles.quoteText}>
            Arive <span className={styles.quoteTextPrimary}>Clean</span>
          </h1>
        </blockquote>
        <button className={styles.heroButton}>
          <Link href="/home#booking" className={styles.buttonText}>
            Let's Go
          </Link>
        </button>
      </div>
    </section>
  );
};

export default Hero;
