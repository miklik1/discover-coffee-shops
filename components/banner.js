import styles from "./banner.module.css";

const Banner = ({ handleOnClick, buttonText }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Coffee Connoisseur</h1>
      <p className={styles.subtitle}> — Discover your local coffee shops!</p>
      <button className={styles.button} onClick={handleOnClick}>
        {buttonText}
      </button>
    </div>
  );
};

export default Banner;
