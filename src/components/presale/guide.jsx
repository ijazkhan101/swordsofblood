import { useContext } from "react";
import Localization from "../../context/localization";
import { importAllImages } from "../../functions/common";
import styles from "./guide.module.css";
import Video from "../homepage/video";
import WhyBuyToken from "./WhyBuyToken";

export default function Guide() {
  const { strings } = useContext(Localization);
  const images = importAllImages();

  const benefits = [
    {
      image: "Exclusive access to MVP closed beta",
      title: strings.benefit1,
    },
    {
      image: "Access to dev diary",
      title: strings.benefit2,
    },
    {
      image: `Limited Legendary in-game weapon`,
      title: strings.benefit3,
    },
    {
      image: "Automatic whitelisting for upcoming NFT sales",
      title: strings.benefit4,
    },
    {
      image: "Entry to phygital giveaways",
      title: strings.benefit5,
    },
    {
      image: "And more",
      title: strings.benefit6,
    },
  ];

  return (
    <main className={styles.howTobuyWrapper}>
      <head>
        <h1 className={[styles.heading, "heading"].join(" ")}>
          {strings.presTtl}
        </h1>
      </head>

      <Benefits benefits={benefits} images={images} />

      <h1>Gameplay</h1>
      <Video img="gameplay.webp" />

      <h1>Why Buy SWDTKN</h1>
      <WhyBuyToken />

      <h1>{strings.presTtl}</h1>
      <div className={styles.howToBuyContainer}>
        <div className={styles.howToBuy}>
          <img
            src={images["presale/Bg.webp"]}
            alt="Stage 1"
            className={[styles.image, "image"].join(" ")}
          />
          <div className={styles.textContainer}>
            <div className={styles.presaleHeader}>
              <img
                src={images["home/presale.webp"]}
                alt="Stage 1"
                className={styles.presaleIcon}
              />
              <p className="title">{strings.presStep1}</p>
            </div>
            <p
              className={[styles.text, "text"].join(" ")}
              dangerouslySetInnerHTML={{ __html: strings.presStep1Desc }}
            />
          </div>
        </div>
        <div className={styles.howToBuy}>
          <img
            src={images["presale/Bg-1.webp"]}
            alt="Stage 2"
            className={[styles.image, "image"].join(" ")}
          />
          <div className={styles.textContainer}>
            <div className={styles.presaleHeader}>
              <img
                src={images["home/presale.webp"]}
                alt="Stage 2"
                className={styles.presaleIcon}
              />
              <p className="title">{strings.presStep2}</p>
            </div>
            <p
              className={[styles.text, "text"].join(" ")}
              dangerouslySetInnerHTML={{ __html: strings.presStep2Desc }}
            />
          </div>
        </div>
        <div className={styles.howToBuy}>
          <img
            src={images["presale/Bg-2.webp"]}
            alt="Stage 3"
            className={[styles.image, "image"].join(" ")}
          />
          <div className={styles.textContainer}>
            <div className={styles.presaleHeader}>
              <img
                src={images["home/presale.webp"]}
                alt="Stage 3"
                className={styles.presaleIcon}
              />
              <p className="title">{strings.presStep3}</p>
            </div>
            <p
              className={[styles.text, "text"].join(" ")}
              dangerouslySetInnerHTML={{ __html: strings.presStep3Desc }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export const Benefits = ({ images, benefits }) => {
  return (
    <div className={styles.benefitsContainer}>
      <h2>Exclusive benefits for presale participants</h2>
      <div className={styles.benefits}>
        {benefits.map(({ image, title }, i) => {
          return (
            <div aria-label="benefit" key={`${title}-${i}`}>
              <img src={images[`presale/icons/${image}.webp`]} alt={title} />
              <span aria-label="image-title">{title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
