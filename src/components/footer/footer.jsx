import { useContext } from "react";
import Localization from "../../context/localization";
import { Link } from "react-router-dom";
import { socialLinks } from "../social-links";
import { config } from "../../functions/config";
import styles from "./footer.module.css";

export default function Footer() {
  const { strings } = useContext(Localization);

  return (
    <footer className={styles.footer}>
      <h6 className={styles.quichLinksHeader}>{strings.quickLinks}</h6>
      <div className={styles.quicklinksContainer}>
        <Link to="/privacy/" className={styles.link}>
          {strings.privPolicy}
        </Link>
        <a
          href="/assets/aml-hitbox.pdf"
          target="_blank"
          className={styles.link}
        >
          {strings.amlPolicy}g
        </a>
        <Link to="/termsandconditions/" className={styles.link}>
          {strings.termsAndConds}
        </Link>
        <a
          href="/assets/SWDTKN-SALE-Terms-and-Conditions.pdf"
          className={styles.link}
          target="_blank"
        >
          {strings.salePolicy}
        </a>
        <a href="/sitemap.xml" target="_blank" className={styles.link}>
          {strings.sitemap}
        </a>
      </div>

      <div className={styles.socialMediaContainer}>
        <div className={styles.allSocialMedia}>
          {socialLinks.map((p, i) => {
            return (
              <a
                key={i}
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className={styles.socialIcon}
              >
                <img src={p.img} alt="" className={styles.socials} />
              </a>
            );
          })}
        </div>
      </div>
      <div>
        <div className={styles.descriptionContainer}>
          <p className={styles.description}>{strings.descText1}</p>
          <p className={styles.description}>
            {strings.descText2.replace("{YEAR}", new Date().getFullYear())}n
          </p>
          <p className={styles.description}>{strings.descText3}</p>
        </div>
      </div>
      <div className={styles.contactAddressContainer}>
        {strings.tokenAddress}:{" "}
        <span className={styles.address}>{config.tokenAddress}</span>
      </div>
    </footer>
  );
}
