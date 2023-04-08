import { useContext } from "react";
import Localization from "../../context/localization";

import { importAllImages } from "../../functions/common";
import styles from "./team.module.css";

export default function Team() {
  const { strings } = useContext(Localization);
  const images = importAllImages();

  const team = [
    {
      name: strings.teamName1,
      title: strings.teamTtl1,
      img: images["home/team/James-Seaman.webp"],
      link: "https://www.linkedin.com/in/swordsofbloodceo/",
    },
    {
      name: strings.teamName2,
      title: strings.teamTtl2,
      img: images["home/team/Jeremy-Brown.webp"],
      link: "https://www.linkedin.com/in/jeremy-brown-29177b3/",
    },
    {
      name: strings.teamName3,
      title: strings.teamTtl3,
      img: images["home/team/Mariusz-Szynalik.webp"],
      link: "https://www.linkedin.com/in/mariusz-szynalik",
    },
    {
      name: strings.teamName4,
      title: strings.teamTtl4,
      img: images["home/team/Yupeng-Qin.webp"],
    },
  ];

  return (
    <div className={styles.teamSection}>
      <h1 className={`heading ${styles.heading}`}>{strings.teamTtl}</h1>

      <div className={styles.teamMembers}>
        {team.map((p, i) => {
          return (
            <div key={i} className={styles.teamMember}>
              <img
                loading="lazy"
                src={p.img}
                alt={`${p.name}`}
                className={styles.teamImage}
              />
            </div>
          );
        })}
        <a href="/team/" className={styles.goToTeam}>
          <img src={images["svg/right.svg"]} alt="right" />
          <small>
            Meet the <br /> team behind
          </small>{" "}
          <span>Swords of Blood</span>
        </a>
      </div>
    </div>
  );
}
