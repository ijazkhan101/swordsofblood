import { useContext } from "react";
import Localization from "../../context/localization";
import { importAllImages } from "../../functions/common";
import style from "./WhyBuyToken.module.scss";

export default function WhyBuyToken() {
  const { strings } = useContext(Localization);
  const images = importAllImages();

  const items = [
    {
      text: strings.whybuyToken1,
      img: 5,
    },
    {
      text: strings.whybuyToken2,
      img: 4,
    },
    {
      text: strings.whybuyToken3,
      img: 3,
    },
    {
      text: strings.whybuyToken4,
      img: 2,
    },
    {
      text: strings.whybuyToken5,
      img: 1,
    },
  ];
  return (
    <div className={style.index}>
      {items.map((val, i) => (
        <div aria-label="item-container" key={`item-${i}`}>
          <img
            src={images[`presale/buy-token/${val.img}.svg`]}
            alt=""
            loading="lazy"
          />
          <p>{val.text}</p>
        </div>
      ))}
    </div>
  );
}
