import Image from "next/image";
import { merriweather, poppins } from "./layout";

export default function Home() {
  return (
    <div>
      <h1 className={merriweather.className}>X-Hotel</h1>
      <div className={poppins.className}>
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
