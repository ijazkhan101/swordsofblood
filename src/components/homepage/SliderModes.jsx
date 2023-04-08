import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper";
import { importAllImages } from "../../functions/common";
import "./SliderModes.scss";

export default function SliderModes({ setTitle, strings }) {
  const images = importAllImages();

  const imgs = [
    { img: "img_1.webp", text: strings.modeT1 },
    { img: "img_2.webp", text: strings.modeT2 },
    { img: "img_3.webp", text: strings.modeT3 },
    { img: "img_4.webp", text: strings.modeT4 },
    { img: "img_5.webp", text: strings.modeT5 },
    { img: "img_6.webp", text: strings.modeT6 },
  ];

  return (
    <Swiper
      onSlideChange={() => {
        const slider = document.querySelector(`[aria-label="active-image"]`);
        const target = slider?.getAttribute("target");
        if (target) setTitle(imgs[parseInt(target.split("-")[1])].text);
        else setTitle(imgs[0].text);
      }}
      effect={"coverflow"}
      grabCursor={false}
      loop={true}
      centeredSlides={true}
      slidesPerView={3}
      autoplay={{
        delay: 2000,
      }}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 50,
        modifier: 20,
        slideShadows: false,
      }}
      modules={[EffectCoverflow, Autoplay]}
      className="mySwiper"
    >
      {imgs.map((val, i) => (
        <SwiperSlide>
          {({ isActive }) => (
            <img
              aria-label={isActive ? "active-image" : ""}
              target={`image-${i}`}
              src={images[`game-mode/${val.img}`]}
              alt=""
            />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
