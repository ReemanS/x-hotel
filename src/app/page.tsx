import Image from "next/image";
import { merriweather, poppins } from "./layout";
import Carousel from "./Carousel";

export default function Home() {
  const images: string[] = [
    "hero/hero1.jpg",
    "hero/hero2.jpg",
    "hero/hero3.jpg",
    "hero/hero4.jpg",
  ];

  return (
    <div>
      <div className={poppins.className}>
        <Carousel images={images} />
        <div className="font-normal">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
          alias, veritatis quibusdam modi, consequatur fuga illum officia
          pariatur eum doloremque at delectus quas? Ab error dignissimos
          assumenda accusamus? Ad, velit!
        </div>
      </div>
    </div>
  );
}
