import React, { useEffect, useState } from "react";
import style from "./SliderGameMode.module.scss";
import { importAllImages } from "../../functions/common";

const imgs = [
  "img_1.webp",
  "img_2.webp",
  "img_3.webp",
  "img_4.webp",
  "img_5.webp",
  "img_6.webp",
];

export default function SliderGameMode() {
  const images = importAllImages();
  const [slider, setSlider] = useState(1);
  useEffect(() => {
    setInterval(() => {
      setSlider((prev) => {
        if (prev < imgs.length) return prev + 1;
        else return 1;
      });
    }, 3000);
  }, []);
  return (
    <div className={style.container}>
      {imgs.map((_src, i) => (
        <CustomInput key={`input-mode-${i}`} index={i + 1} slider={slider} />
      ))}

      <div aria-label="cards">
        {imgs.map((src, i) => (
          <CustomImage
            key={`image-mode-${i}`}
            imgs={imgs}
            slider={slider}
            id={i + 1}
            src={images[`game-mode/${src}`]}
          />
        ))}
      </div>
    </div>
  );
}

const CustomImage = ({ id, src, slider, imgs }) => {
  return (
    <label
      style={{ display: checkIfVisible(slider, imgs, id) ? "block" : "none" }}
      aria-label="card"
      for={`item-${id}`}
      id={`mode-${id}`}
    >
      <img src={src} alt="mode" />
    </label>
  );
};

function checkIfVisible(slider, array, index) {
  let diff = slider - index;
  if (diff < 0) diff = diff * -1;
  return diff <= 1 || diff === (array.length - 1);
}

const CustomInput = ({ slider, index }) => {
  return (
    <input
      style={{ pointerEvents: "none" }}
      type="radio"
      name="slider"
      id={`item-${index}`}
      checked={slider === index ? true : false}
    />
  );
};
