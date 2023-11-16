import { merriweather, poppins } from "./layout";
import Carousel from "./Carousel";
import CenterActions from "./CenterActions";
// import ButtonTest from "./ButtonTest";
import HomeNavbar from "./HomeNavbar";

export default function Home() {
  const images: string[] = [
    "hero/hero1.jpg",
    "hero/hero2.jpg",
    "hero/hero3.jpg",
    "hero/hero4.jpg",
  ];

  return (
    <main className="relative">
      <div className={poppins.className}>
        <HomeNavbar />
        <Carousel images={images} />
        <CenterActions font={merriweather.className} route="/booking" />
      </div>
    </main>
  );
}
