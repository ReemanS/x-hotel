import { Center, SimpleGrid, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { getTransactionById, getRoomById } from "@/firebase/config";
import { Transaction, Room } from "@/firebase/schema";
import Link from "next/link";
import { HiOutlineExternalLink } from "react-icons/hi";
import Image from "next/image";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { MdMeetingRoom } from "react-icons/md";

function TransactionDetails({ id }: { id: string }) {
  const [transaction, setTransaction] = useState<Transaction>();
  const [room, setRoom] = useState<Room>();
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const getDetails = async () => {
      const transaction = await getTransactionById(id);
      if (transaction) {
        setTransaction(transaction);
        const room = await getRoomById(transaction.roomDetails.roomNumber);
        setRoom(room);
        if (room) {
          setImages([
            room.roomImages.img1,
            room.roomImages.img2,
            room.roomImages.img3,
          ]);
        }
        setLoading(false);
      }
      setLoading(false);
    };
    getDetails();
  }, []);

  const localeOptions: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  return (
    <Center className="mt-4">
      {loading ? (
        <div>
          <Spinner size="xl" color="blue.500" className="mt-8" />
        </div>
      ) : transaction ? (
        <div className="flex flex-col w-full md:w-1/2">
          <div
            ref={ref}
            className="border border-dashed border-accent bg-white p-4 rounded-md font-poppins"
          >
            <Center className="mb-2">
              <div className="flex flex-col items-center">
                <div className="font-extrabold text-lg">Transaction found!</div>
                <div className="text-xs text-gray-500">
                  Transaction ID: {transaction.transId}
                </div>
              </div>
            </Center>

            <div className="relative object-cover h-96 mb-2">
              <Image
                alt="room image"
                src={images[currentImageIndex]}
                fill={true}
                quality={75}
                className="object-cover"
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
                    setCurrentImageIndex(
                      (currentImageIndex + 1) % images.length
                    )
                  }
                  className="bg-white/75 rounded-full p-2 mx-2"
                >
                  <Center>
                    <BsChevronRight />
                  </Center>
                </button>
              </div>
            </div>

            <Center className="mb-2">
              <div className="flex flex-col items-center">
                <div className="font-merriweather font-bold text-2xl">
                  {room?.roomName}
                </div>
                <div className="flex items-center text-primary text-sm">
                  <MdMeetingRoom className="mr-0.5 " />
                  {room?.roomNumber} | {room?.roomClassification} Room
                </div>
              </div>
            </Center>

            <Center>
              <SimpleGrid
                columns={2}
                spacing={4}
                className="mb-3 font-poppins text-sm md:text-base"
              >
                <div className="font-semibold">
                  <div>Customer name:</div>
                  <div>Check-in date:</div>
                  <div>Check-out date:</div>
                  <div className="mb-3">Number of guests:</div>
                  <div>Transaction date:</div>
                  <div>Transaction amount:</div>
                </div>
                <div>
                  <div>{transaction.customerName}</div>
                  <div>
                    {new Intl.DateTimeFormat("en-US", localeOptions).format(
                      new Date(transaction.roomDetails.startDate)
                    )}
                  </div>
                  <div>
                    {new Intl.DateTimeFormat("en-US", localeOptions).format(
                      new Date(transaction.roomDetails.endDate)
                    )}
                  </div>
                  <div className="mb-3">{transaction.guestCount}</div>
                  <div>
                    {new Intl.DateTimeFormat("en-US", localeOptions).format(
                      new Date(transaction.transDate)
                    )}
                  </div>
                  <div>₱{transaction.transAmount}.00</div>
                </div>
              </SimpleGrid>
            </Center>
          </div>
          <Center>
            <Link
              href={"/"}
              className="flex hover:underline hover:text-primary active:text-accent duration-150 items-center text-sm md:text-base drop-shadow-md mt-2 mb-8"
            >
              <span className="pe-1 text-sm">Return to homepage</span>
              <HiOutlineExternalLink />
            </Link>
          </Center>
        </div>
      ) : (
        <div className="flex flex-col items-center mb-8">
          <div className="mt-4 text-2xl">Transaction not found</div>
          <Link
            href={"/"}
            className="flex hover:underline hover:text-primary active:text-accent duration-150 items-center text-sm md:text-base drop-shadow-md"
          >
            <span className="pe-1">Return to homepage</span>
            <HiOutlineExternalLink />
          </Link>
        </div>
      )}
    </Center>
  );
}

export default TransactionDetails;
