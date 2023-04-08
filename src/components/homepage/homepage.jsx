import Banner from "./banner";
import WhatYouGet from "./what-you-get";
import About from "./about";
import ContactUs from "./contactus";
import AsSeenOn from "./as-seen-on";
import Facilities from "./facilities";
import Team from "./team";
import Partners from "./partners";
import Video from "./video";
import GameMode from "./GameMode";

export default function Homepage() {
  return (
    <>
      <Banner />
      <WhatYouGet />
      <Video title="Gameplay" img="gameplay.webp" />
      <About />
      <GameMode />
      <AsSeenOn />
      <Video
        standard={true}
        url="https://youtu.be/TazaDM80Tb8"
        img="presale/bg2.webp"
      />
      <Facilities />
      <Partners />
      <Team />
      <ContactUs />
    </>
  );
}
