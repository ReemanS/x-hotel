import { Center, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState, useRef, useCallback } from "react";
import QRCode from "react-qr-code";
import { getTransactionById, getRoomById } from "@/firebase/config";
import { Transaction, Room } from "@/firebase/schema";
import Link from "next/link";
import { HiOutlineExternalLink } from "react-icons/hi";
import { toPng } from "html-to-image";

function Receipt({ id }: { id: string }) {
  const [transaction, setTransaction] = useState<Transaction>();
  const [room, setRoom] = useState<Room>();
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getDetails = async () => {
      const transaction = await getTransactionById(id);
      if (transaction) {
        setTransaction(transaction);
        const room = await getRoomById(transaction.roomDetails.roomNumber);
        console.log(transaction.roomDetails.roomNumber);
        setRoom(room);
        setLoading(false);
      }
      setLoading(false);
    };
    getDetails();
  }, []);

  const handleClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "receipt.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

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
        <div className="flex flex-col">
          <div
            ref={ref}
            className="w-80 border border-dashed border-accent bg-white p-4 rounded-md"
          >
            <Center>
              <div className="flex flex-col items-center">
                <img
                  src="/x-hotel_logo.svg"
                  alt="Logo"
                  width={80}
                  className="p-1 rounded-lg"
                />
                <div className="font-poppins text-primary">X-Hotel Inc.</div>
                <div className="font-merriweather font-bold text-xl mb-3">
                  Official Receipt
                </div>
              </div>
            </Center>
            <Center className="mb-3">
              <QRCode value={transaction.transId} size={250} />
            </Center>
            <div className="flex flex-col items-center font-poppins">
              <div className="font-poppins">Transaction ID:</div>
              <div className="text-xs mb-2">{transaction.transId}</div>
            </div>
            <div className="text-sm font-poppins">
              <div className="flex justify-between">
                <div className="font-bold">Room Name:</div>
                <div>{room?.roomName}</div>
              </div>
              <div className="flex justify-between">
                <div className="font-bold">Room Number:</div>
                <div>{room?.roomNumber}</div>
              </div>
              <div className="flex justify-between">
                <div className="font-bold">Check-in:</div>
                <div>
                  {new Intl.DateTimeFormat("en-US", localeOptions).format(
                    new Date(transaction.roomDetails.startDate as string)
                  )}
                </div>
              </div>
              <div className="flex justify-between mb-4">
                <div className="font-bold">Check-out:</div>
                <div>
                  {new Intl.DateTimeFormat("en-US", localeOptions).format(
                    new Date(transaction.roomDetails.endDate as string)
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="font-bold">Payor Name:</div>
                <div>{transaction.customerName}</div>
              </div>
              <div className="flex justify-between">
                <div className="font-bold">Transaction Date:</div>
                <div>
                  {new Intl.DateTimeFormat("en-US", localeOptions).format(
                    new Date(transaction.transDate as string)
                  )}
                </div>
              </div>
              <div className="flex justify-between mb-4">
                <div className="font-bold">Payment Method:</div>
                <div>
                  {transaction.paymentMethod === "card"
                    ? "Credit Card"
                    : "Walk-in"}
                </div>
              </div>

              <div className="flex justify-between">
                <div className="font-bold">Room daily rate</div>
                <div>₱ {room?.roomDailyRate}.00</div>
              </div>
              <div className="flex justify-between">
                <div className="font-bold">Number of days:</div>
                <div>{transaction.transAmount / room!.roomDailyRate}</div>
              </div>
              <div className="flex justify-between">
                <div className="font-bold">Total:</div>
                <div className="font-bold">₱ {transaction.transAmount}.00</div>
              </div>
            </div>
            <Center>
              <div className="font-poppins italic text-xs mt-4">
                This serves as an official receipt for the transaction above.
              </div>
            </Center>
          </div>
          <button onClick={handleClick} className="mt-4 small-action-button">
            Download Receipt
          </button>
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
        <div className="flex flex-col items-center">
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

export default Receipt;
