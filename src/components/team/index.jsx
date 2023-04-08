import { useContext } from "react";
import Localization from "../../context/localization";
import { importAllImages } from "../../functions/common";
import styles from "./team.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import Banner from "../homepage/banner";

export default function Index() {
  const { strings } = useContext(Localization);
  const images = importAllImages();

  const team = [
    {
      name: strings.teamName1,
      title: strings.teamTtl1,
      bio: strings.teamBio1,
      img: images["home/team/James-Seaman.webp"],
      link: "https://www.linkedin.com/in/swordsofbloodceo/",
    },
    {
      name: strings.teamName2,
      title: strings.teamTtl2,
      bio: strings.teamBio2,
      img: images["home/team/Jeremy-Brown.webp"],
      link: "https://www.linkedin.com/in/jeremy-brown-29177b3/",
    },
    {
      name: strings.teamName3,
      title: strings.teamTtl3,
      bio: strings.teamBio3,
      img: images["home/team/Mariusz-Szynalik.webp"],
      link: "https://www.linkedin.com/in/mariusz-szynalik",
    },
    {
      name: strings.teamName7,
      title: strings.teamTtl7,
      bio: strings.teamBio4,
      img: images["home/team/Vee-Lozano.webp"],
      link: "https://www.linkedin.com/in/vcolozano/",
    },
    {
      name: strings.teamName12,
      title: strings.teamTtl12,
      bio: strings.teamBio5,
      img: images["home/team/kamran_sadikhov.webp"],
      link: "https://www.linkedin.com/in/kamran-sadikhov-052481190/",
    },
    {
      name: strings.teamName5,
      title: strings.teamTtl5,
      bio: strings.teamBio6,
      img: images["home/team/Jakub-Szamalek.webp"],
      link: "https://www.linkedin.com/in/jakub-szamalek-039aba51/",
    },
    {
      name: strings.teamName11,
      title: strings.teamTtl11,
      bio: strings.teamBio7,
      img: images["home/team/Ben Abbot.webp"],
      link: "https://www.instagram.com/abbott_ben/",
      insta: true,
    },
    {
      name: strings.teamName10,
      title: strings.teamTtl10,
      bio: strings.teamBio8,
      img: images["home/team/Adam Vine.webp"],
    },
    {
      name: strings.teamName6,
      title: strings.teamTtl6,
      img: images["home/team/John-Moyer.webp"],
      link: "https://www.instagram.com/johnmoyerbass/",
      insta: true,
    },
    {
      name: strings.teamName4,
      title: strings.teamTtl4,
      img: images["home/team/Yupeng-Qin.webp"],
    },
    {
      name: strings.teamName8,
      title: strings.teamTtl8,
      img: images["home/team/Jason-Hung.webp"],
      link: "https://www.linkedin.com/in/jasonhung-earth",
    },
    {
      name: strings.teamName9,
      title: strings.teamTtl9,
      img: images["home/team/Charlie-Hu.webp"],
      link: "https://www.linkedin.com/in/charlieyechuanhu/",
    },
  ];
  return (
    <>
      <Banner />
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
                <div className={styles.infoAndSocial}>
                  <div>
                    <p className={[styles.text, "text"].join(" ")}>{p.name}</p>
                    <p className={[styles.subtext, "subtext"].join(" ")}>
                      {p.title}
                    </p>
                    {p.bio ? <p className={styles.bio}>{p.bio}</p> : <></>}
                  </div>
                  {!p.insta && p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.linkedin}
                    >
                      <FontAwesomeIcon icon={faLinkedinIn} />
                    </a>
                  )}
                  {p.insta && p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.insta}
                    >
                      <img
                        src={images["socialmediaIcons/instagram.png"]}
                        alt="instagram-icon"
                      />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
