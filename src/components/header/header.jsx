import { useContext, useState, useEffect, useRef } from "react";
import Localization from "../../context/localization";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faBars,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { config } from "../../functions/config";
import { importAllImages } from "../../functions/common";
import styles from "./header.module.css";
import { Link } from "react-router-dom";

export default function Header({ toggleSidebar }) {
  const { strings, lang, locales, SetLanguage } = useContext(Localization);
  const [langMenu, setLangMenu] = useState([]);
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const langSwitch = useRef(null);
  const images = importAllImages();

  const toggleButton = () => {
    if (sidebarOpened) setSidebarOpened(false);
    else setSidebarOpened(true);
    toggleSidebar();
  };

  useEffect(() => {
    let langs = [];
    locales.forEach((l) => {
      if (l !== lang) {
        langs.push(
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <Link
            key={l}
            to="#"
            className={styles.content}
            onClick={(_e) => {
              SetLanguage(l);
            }}
          >
            <img
              src={images[`lang/${l}.png`]}
              alt="language"
              className={styles.flag}
            />{" "}
            {l.toUpperCase()}
          </Link>
        );
      }
    });
    setLangMenu(langs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link to="/">
          <img
            src={images["logo.webp"]}
            alt={strings.logoTitle}
            className={styles.logo}
          />
        </Link>
      </div>
      {sidebarOpened ? (
        <button onClick={toggleButton} className={styles.close}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      ) : (
        <button onClick={toggleButton} className={styles.hamburger}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      )}
      <img
        src={images["logo.webp"]}
        alt="Swords of Blood"
        className={styles.headerLogo}
      />
      <div className={styles.adressAndLanugage}>
        <p className={styles.contactAddress}>
          {strings.tokenAddress}: {config.tokenAddress}
        </p>
        <div className={styles.languageChangingDropdown}>
          <button ref={langSwitch} className={styles.dropbtn}>
            <div className={styles.languageAndCountryName}>
              <span className={styles.iconAndCountry}>
                <img
                  src={images[`lang/${lang}.png`]}
                  alt="language"
                  className={styles.flag}
                />{" "}
                {lang.toUpperCase()}
              </span>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
          </button>
          <div className={styles.dropdownContent}>
            {langMenu.length > 0 && <>{langMenu}</>}
          </div>
        </div>
      </div>
    </header>
  );
}
