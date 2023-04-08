import styles from "./banner.module.css";

export default function bannerVideo() {
  return (
    <video
      style={{ pointerEvents: "none" }}
      className={["image", styles.image].join(" ")}
      autoPlay
      loop
      muted
      playsinline
    >
      <source src="/assets/video/hero3.webm" type="video/webm" />
      <source src="/assets/video/hero3.mp4" type="video/mp4" />
    </video>
  );
}
