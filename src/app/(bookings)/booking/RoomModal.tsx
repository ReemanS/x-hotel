import Image from "next/image";
import { FormValues, Room } from "@/firebase/schema";
import {
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Center,
  SimpleGrid,
  FormControl,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  BsChevronLeft,
  BsChevronRight,
  BsFillPersonFill,
  BsCashStack,
} from "react-icons/bs";
import { FiChevronRight } from "react-icons/fi";
import { BiSolidBed, BiSolidCity, BiSolidShower } from "react-icons/bi";
import { MdPets } from "react-icons/md";
import { PiSwimmingPoolFill } from "react-icons/pi";
import Link from "next/link";

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
  formValues,
}: {
  room: Room;
  setOpenRoomIndex: React.Dispatch<React.SetStateAction<number>>;
  displayClassificationIcons: (
    classification: string
  ) => React.JSX.Element | undefined;
  formValues: FormValues;
}) {
  const [balance, setBalance] = useState<number>(0);

  const images = [
    room.roomImages.img1,
    room.roomImages.img2,
    room.roomImages.img3,
  ];

  // Effect for preloading images and calculating balance
  useEffect(() => {
    images.forEach((image) => {
      const img = new window.Image();
      img.src = image;
    });
    setBalance(
      calculateBalance(
        formValues.checkInDate as Date,
        formValues.checkOutDate as Date,
        room.roomDailyRate
      )
    );
  }, []);

  const localeOptions: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
  };

  const calculateBalance = (
    checkInDate: Date,
    checkOutDate: Date,
    roomDailyRate: number
  ) => {
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays * roomDailyRate;
  };

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
            <div className="flex items-center font-poppins text-xs mb-0.5">
              {displayClassificationIcons(room.roomClassification)}
              {room.roomClassification}
            </div>
            <div className="text-xs text-primary font-poppins flex items-center mb-2">
              <BsCashStack className="mr-1" />
              <div>₱{room.roomDailyRate} per night</div>
            </div>
            <div className="font-poppins text-sm">{room.roomDescription}</div>
          </div>
          <SimpleGrid columns={2} spacing={2} className="mb-3 font-poppins">
            <div>
              <Center>
                <div className="font-bold">Features</div>
              </Center>
              <div className="flex flex-col w-28 md:w-60 px-4 md:px-16">
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

            <div>
              <Center>
                <div className="font-bold">Capacity</div>
              </Center>
              <div className="px-4 md:px-12">
                <div className="flex items-center">
                  <BsFillPersonFill className="mr-1 text-primary" />
                  <div className="text-sm">
                    {room.roomCapacity}{" "}
                    {room.roomCapacity > 1 ? "guests" : "guest"}
                  </div>
                </div>
                <div className="flex items-center">
                  <BiSolidBed className="mr-1 text-primary" />
                  <div className="text-sm">
                    {room.bedCount} {room.bedCount > 1 ? "beds" : "bed"}
                  </div>
                </div>
              </div>
            </div>
          </SimpleGrid>
          <div className="text-sm w-full font-poppins">
            <Center className="text-base font-bold">Booking Details</Center>
            <div className="px-8 md:px-24">
              <div>
                <span className="font-bold mr-1">Check-in date:</span>
                {new Intl.DateTimeFormat("en-US", localeOptions).format(
                  formValues.checkInDate as Date
                )}
              </div>

              <div>
                <span className="font-bold mr-1">Check-out date:</span>
                {new Intl.DateTimeFormat("en-US", localeOptions).format(
                  formValues.checkOutDate as Date
                )}
              </div>

              <div>
                <span className="font-bold mr-1">Number of guests:</span>
                <span>{formValues.guestCount}</span>
              </div>
            </div>
          </div>
        </div>
      </ModalBody>

      <ModalFooter>
        {balance === 0 ? (
          <div className="text-red-500 text-sm">
            Please select different dates for check-in and check-out
          </div>
        ) : (
          <>
            <div className="flex flex-col mr-4 font-poppins">
              <span className="font-bold mr-1">Total balance:</span>
              <span>₱ {balance.toFixed(2)}</span>
            </div>
            <Link
              href={{
                pathname: "/payment",
                query: {
                  roomNumber: room.roomNumber,
                  roomName: room.roomName,
                  checkInDate: formValues.checkInDate.toLocaleString(),
                  checkOutDate: formValues.checkOutDate.toLocaleString(),
                  guestCount: formValues.guestCount,
                  balance: balance,
                },
              }}
            >
              <button
                className="action-button font-poppins flex items-center"
                disabled={balance === 0 ? true : false}
              >
                <span className="mr-1">Proceed</span>
                <FiChevronRight />
              </button>
            </Link>
          </>
        )}
      </ModalFooter>
    </>
  );
}

export default RoomModal;
