"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import ProgressSteps from "../booking/ProgressSteps";
import {
  Center,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  Grid,
  GridItem,
} from "@chakra-ui/react";

// {searchParams.get("roomName")}

function Payment() {
  const searchParams = useSearchParams();
  const [cardNumber, setCardNumber] = useState("");

  const formatNumberToCC = (value: string) => {
    const v = value
      .replace(/\s+/g, "")
      .replace(/[^0-9]/gi, "")
      .substr(0, 16);
    const parts = [];

    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substr(i, 4));
    }

    return parts.length > 1 ? parts.join(" ") : value;
  };
  return (
    <>
      <ProgressSteps activeStep={1} />

      <Center>
        <div className="flex flex-wrap w-2/3">
          <section className="basis-full md:basis-7/12 justify-center md:justify-normal bg-sky-50/25 p-4 rounded-md outline-dashed outline-1 outline-accent font-poppins mr-2">
            <div className="flex flex-col md:flex-row items-center mb-4">
              <h1 className="text-lg md:text-xl mr-4">Pay using your card</h1>
              <img src="cards.png" className="h-6" alt="card images" />
            </div>

            <div className="flex flex-wrap">
              <FormControl className="basis-80">
                <FormLabel>Card number</FormLabel>
                <NumberInput
                  value={formatNumberToCC(cardNumber)}
                  onChange={(newValue) => setCardNumber(newValue)}
                >
                  <NumberInputField />
                </NumberInput>
              </FormControl>
            </div>
          </section>
          <section className="basis-full md:basis-1/3 justify-center md:justify-normal bg-sky-50/25 p-4 rounded-md outline-dashed outline-1 outline-accent font-poppins">
            foo
          </section>
        </div>
      </Center>
    </>
  );
}

export default Payment;
