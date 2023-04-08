import { useContext } from "react";
import Localization from "../../context/localization";
import { importAllImages } from "../../functions/common";
import styles from "./contactus.module.css";

export default function ContactUs() {
  const { strings } = useContext(Localization);
  const images = importAllImages();

  return (
    <div className={styles.contactusWrapper}>
      <div className={styles.contactus}>
        <img
          src={images["svg/trolley.svg"]}
          alt="Unlock new opportunities to earn SWDTKN when you join our growing community of gamers. Enjoy an immersive web3 mobile game and earn tokens!"
          className={[styles.image, "image"].join(" ")}
        />
      </div>

      <div className={styles.textWrapper}>
        <p className={styles.contactDetails}>{strings.contactUsDesc}</p>
        <a
          href="mailto:social@swordsofblood.com"
          className={styles.contactButton}
        >
          {strings.contactUs}
        </a>
      </div>
    </div>
  );
}
