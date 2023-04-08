import { useContext, useState } from "react";
import { importAllImages } from "../../functions/common";
import style from "./gameMode.module.css";
import SliderModes from "./SliderModes";
import Localization from "../../context/localization";

export default function GameMode() {
  const { strings } = useContext(Localization);
  const [title, setTitle] = useState("");
  const images = importAllImages();
  return (
    <div className={style.index}>
      <h1>game modes</h1>
      <SliderModes setTitle={setTitle} strings={strings} />
      <div className={style.sub_title}>
        <img src={images["svg/double-left.svg"]} alt="left" />
        <h3>{title}</h3>
        <img src={images["svg/double-right.svg"]} alt="right" />
      </div>
      <p className={style.text}>
        {strings.modeInfo} <a href="/presale/">SWDTKN presale!</a>
      </p>
    </div>
  );
}
