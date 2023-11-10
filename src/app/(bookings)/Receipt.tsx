import { Center } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useMediaQuery } from "@chakra-ui/react";
import { getTransactionById } from "@/firebase/config";
import { Transaction } from "@/firebase/schema";

function Receipt({ id }: { id: string }) {
  useEffect(() => {
    const getTransactions = async () => {
      const transaction = await getTransactionById(id);
      if (transaction) {
        console.log(transaction.customerName);
      }
    };
    getTransactions();
  }, []);
  return (
    <Center>
      <section className="w-80 bg-yellow-50 p-4 rounded-md">
        <Center>
          <div className="font-merriweather font-bold text-xl mb-2">
            Official Receipt
          </div>
        </Center>
        <Center>
          <QRCode value={id} size={250} />
        </Center>
      </section>
    </Center>
  );
}

export default Receipt;
