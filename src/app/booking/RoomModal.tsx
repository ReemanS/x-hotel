import Image from "next/image";
import { Room } from "@/firebase/schema";
import {
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Center,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { BiSolidCity, BiSolidShower } from "react-icons/bi";
import { MdPets } from "react-icons/md";
import { PiSwimmingPoolFill } from "react-icons/pi";

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

function RoomModal({
  room,
  setOpenRoomIndex,
  displayClassificationIcons,
}: {
  room: Room;
  setOpenRoomIndex: React.Dispatch<React.SetStateAction<number>>;
  displayClassificationIcons: (
    classification: string
  ) => React.JSX.Element | undefined;
}) {
  const images = [
    room.roomImages.img1,
    room.roomImages.img2,
    room.roomImages.img3,
  ];

  useEffect(() => {
    images.forEach((image) => {
      const img = new window.Image();
      img.src = image;
    });
  }, []);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  return (
    <>
      <ModalHeader></ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <div>
          <div className="relative object-cover h-80 mb-2">
            <Image
              src={images[currentImageIndex]}
              alt=""
              fill={true}
              quality={75}
              placeholder={`data:image/svg+xml;base64,${toBase64(
                shimmer(700, 475)
              )}`}
              style={{ objectFit: "cover", borderRadius: "0.5rem" }}
            />
            <div className="absolute top-1/2 -translate-y-1/2 flex w-full justify-between">
              <button
                onClick={() =>
                  setCurrentImageIndex(
                    (currentImageIndex - 1 + images.length) % images.length
                  )
                }
                className="bg-white/75 rounded-full p-2 mx-2"
              >
                <Center>
                  <BsChevronLeft />
                </Center>
              </button>
              <button
                onClick={() =>
                  setCurrentImageIndex((currentImageIndex + 1) % images.length)
                }
                className="bg-white/75 rounded-full p-2 mx-2"
              >
                <Center>
                  <BsChevronRight />
                </Center>
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col items-center mb-1">
            <div className="font-merriweather font-bold text-2xl">
              {room.roomName}
            </div>
            <div className="flex items-center font-poppins text-xs mb-2">
              {displayClassificationIcons(room.roomClassification)}
              {room.roomClassification}
            </div>
            <div className="font-poppins text-sm">{room.roomDescription}</div>
          </div>
          <SimpleGrid columns={2} spacing={2} className="bg-yellow-50">
            <div>
              <div className="font-bold">Features</div>
              <div className="flex flex-col w-28 md:w-60">
                {room.roomFeatures.hasCityView && (
                  <div className="flex items-center">
                    <BiSolidCity className="mr-1 text-primary" />
                    <div className="text-sm">City View</div>
                  </div>
                )}
                {room.roomFeatures.hasPrivatePool && (
                  <div className="flex items-center">
                    <PiSwimmingPoolFill className="mr-1 text-primary" />
                    <div className="text-sm">Private Pool</div>
                  </div>
                )}
                {room.roomFeatures.hasShower && (
                  <div className="flex items-center">
                    <BiSolidShower className="mr-1 text-primary" />
                    <div className="text-sm">Shower</div>
                  </div>
                )}
                {room.roomFeatures.isPetFriendly && (
                  <div className="flex items-center">
                    <MdPets className="mr-1 text-primary" />
                    <div className="text-sm">Pet Friendly</div>
                  </div>
                )}
              </div>
            </div>
            <div>items2</div>
          </SimpleGrid>
        </div>
      </ModalBody>

      <ModalFooter>
        <div>footer</div>
      </ModalFooter>
    </>
  );
}

export default RoomModal;
