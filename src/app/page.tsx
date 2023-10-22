import { merriweather, poppins } from "./layout";
import Carousel from "./Carousel";
import CenterActions from "./CenterActions";
import ButtonTest from "./ButtonTest";

export default function Home() {
  const images: string[] = [
    "hero/hero1.jpg",
    "hero/hero2.jpg",
    "hero/hero3.jpg",
    "hero/hero4.jpg",
  ];

  return (
    <div className="relative">
      <div className={poppins.className}>
        <Carousel images={images} />
        <CenterActions font={merriweather.className} route="/booking" />

        <div className="font-normal">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
          alias, veritatis quibusdam modi, consequatur fuga illum officia
          pariatur eum doloremque at delectus quas? Ab error dignissimos
          assumenda accusamus? Ad, velit!
        </div>
        <ButtonTest />
      </div>
    </div>
  );
}
