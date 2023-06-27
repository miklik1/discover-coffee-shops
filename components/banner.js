import styles from "./banner.module.css";

const Banner = (props) => {

  const handleOnBannerBtnClick = (e) => {
    console.log(e.target);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Coffee Connoisseur</h1>
      <p className={styles.subtitle}> — Discover your local coffee shops!</p>
      <button className={styles.button} onClick={handleOnBannerBtnClick}>{props.buttonText}</button>
    </div>
  );
};

export default Banner;
