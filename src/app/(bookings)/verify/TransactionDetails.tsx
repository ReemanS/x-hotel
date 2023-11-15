import { Center, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { getTransactionById, getRoomById } from "@/firebase/config";
import { Transaction, Room } from "@/firebase/schema";
import Link from "next/link";
import { HiOutlineExternalLink } from "react-icons/hi";

function TransactionDetails({ id }: { id: string }) {
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
        <div className="flex flex-col w-2/3">
          <div
            ref={ref}
            className="border border-dashed border-accent bg-yellow-50 p-4 rounded-md"
          >
            test
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
