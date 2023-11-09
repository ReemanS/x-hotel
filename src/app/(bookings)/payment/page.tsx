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
  Input,
  Checkbox,
  FormErrorMessage,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import { OccupancyData, Transaction } from "@/firebase/schema";
import { editRoomOccupancyDetails, addToTransactions } from "@/firebase/config";

// {searchParams.get("roomName")}

function Payment() {
  const searchParams = useSearchParams();
  const [cardNumber, setCardNumber] = useState("");
  const [cvsCode, setCvsCode] = useState<number>();
  const [expiryDate, setExpiryDate] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // Error checks for form
  const isCardNumberValid = cardNumber.length === 16;
  const isCvsCodeValid = cvsCode ? cvsCode.toString().length === 3 : false;
  const isExpiryDateValid = expiryDate.length === 7;
  const isCardHolderNameValid = cardHolderName.length > 0;
  const isContactNumberValid = contactNumber.length > 0;

  // Regex checks
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

  const formatExpiryDate = (date: string) => {
    const digits = date.replace(/\D/g, "");
    const formatted =
      digits.slice(0, 2) +
      (digits.length > 2 ? "/" + digits.slice(2) : "").slice(0, 5);

    return formatted;
  };

  const allFormsValid = () => {
    return (
      isCardNumberValid &&
      isCvsCodeValid &&
      isExpiryDateValid &&
      isCardHolderNameValid &&
      isContactNumberValid &&
      checked
    );
  };

  const handleClick = async () => {
    if (allFormsValid()) {
      setLoading(true);
      const occupancyData: OccupancyData = {
        balance: parseInt(searchParams.get("balance") as string),
        checkInDate: searchParams.get("checkInDate") as string,
        checkOutDate: searchParams.get("checkOutDate") as string,
        guestCount: parseInt(searchParams.get("guestCount") as string),
        roomName: searchParams.get("roomName") as string,
        roomNumber: parseInt(searchParams.get("roomNumber") as string),
        customerName: cardHolderName,
        customerPhoneNumber: contactNumber,
      };

      const transId = await editRoomOccupancyDetails(occupancyData);
      const success = await addToTransactions({
        transId: transId,
        transAmount: occupancyData.balance,
        transDate: new Date().toISOString(),
        guestCount: occupancyData.guestCount,
        roomDetails: {
          roomNumber: occupancyData.roomNumber,
          startDate: occupancyData.checkInDate,
          endDate: occupancyData.checkOutDate,
        },
        customerName: occupancyData.customerName,
        customerPhoneNumber: occupancyData.customerPhoneNumber,
      });

      if (success != "") {
        toast({
          title: `Payment successful: ${success}`,
          status: "success",
          duration: 2000,
          isClosable: false,
        });
        setLoading(false);
      } else {
        toast({
          title: "Payment failed",
          status: "error",
          duration: 2000,
          isClosable: false,
        });
        setLoading(false);
      }
    }
  };

  const localeOptions: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  return (
    <>
      <ProgressSteps activeStep={1} />

      <Center>
        <div className="flex flex-wrap w-2/3">
          <section className="basis-full md:basis-7/12 md:mr-2 mb-2 md:mb-0 justify-center md:justify-normal bg-sky-50/25 p-4 rounded-md outline-dashed outline-1 outline-accent font-poppins">
            <div className="flex flex-col md:flex-row items-center mb-4">
              <h1 className="text-base md:text-xl mr-4 mb-2">
                Pay using your card
              </h1>
              <img src="cards.png" className="h-6" alt="card images" />
            </div>

            <div className="flex flex-wrap">
              <FormControl
                isInvalid={!isCardNumberValid}
                className="basis-full mb-2"
              >
                <FormLabel>Card number</FormLabel>
                <NumberInput
                  value={formatNumberToCC(cardNumber)}
                  onChange={(newValue) => setCardNumber(newValue)}
                >
                  <NumberInputField />
                  {isCardNumberValid ? null : (
                    <FormErrorMessage>
                      Please enter a valid credit card number
                    </FormErrorMessage>
                  )}
                </NumberInput>
              </FormControl>
              <FormControl
                isInvalid={!isCvsCodeValid}
                className="basis-48 grow lg:mr-2 mb-2"
              >
                <FormLabel>CVS Code</FormLabel>
                <NumberInput
                  onChange={(newValue) => {
                    setCvsCode(parseInt(newValue));
                  }}
                >
                  <NumberInputField />
                  {isCvsCodeValid ? null : (
                    <FormErrorMessage>Invalid CVS code</FormErrorMessage>
                  )}
                </NumberInput>
              </FormControl>
              <FormControl
                isInvalid={!isExpiryDateValid}
                className="basis-40 grow mb-2"
              >
                <FormLabel>Expiry Date</FormLabel>
                <Input
                  type="text"
                  value={expiryDate}
                  onChange={(newValue) =>
                    setExpiryDate(formatExpiryDate(newValue.target.value))
                  }
                />
                {isExpiryDateValid ? null : (
                  <FormErrorMessage>Invalid expiry date</FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                isInvalid={!isCardHolderNameValid}
                className="basis-full mb-2"
              >
                <FormLabel>Card Holder Name</FormLabel>
                <Input
                  type="text"
                  value={cardHolderName}
                  onChange={(newValue) =>
                    setCardHolderName(newValue.target.value)
                  }
                />
                {isCardHolderNameValid ? null : (
                  <FormErrorMessage>Please enter your name</FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                isInvalid={!isContactNumberValid}
                className="basis-full mb-2"
              >
                <FormLabel>Contact Number</FormLabel>
                <Input
                  type="text"
                  value={contactNumber}
                  onChange={(newValue) =>
                    setContactNumber(newValue.target.value)
                  }
                />
                {isContactNumberValid ? null : (
                  <FormErrorMessage>
                    Please enter your contact number
                  </FormErrorMessage>
                )}
              </FormControl>
            </div>
          </section>
          <section className="basis-full md:basis-1/3 flex flex-col flex-wrap justify-center md:justify-normal bg-sky-50/25 p-4 rounded-md outline-dashed outline-1 outline-accent font-poppins">
            <Center>
              <h1 className="text-base md:text-xl mb-4">Summary</h1>
            </Center>
            <div className="text-sm">
              <div className="flex justify-between">
                <div className="font-bold mb-2">Room Name:</div>
                <div className="mb-2">{searchParams.get("roomName")}</div>
              </div>
              <div className="flex justify-between">
                <div className="font-bold mb-2">Check-in Date:</div>
                <div className="mb-2">
                  {new Intl.DateTimeFormat("en-US", localeOptions).format(
                    new Date(searchParams.get("checkInDate") as string)
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="font-bold mb-2">Check-out Date:</div>
                <div className="mb-2">
                  {new Intl.DateTimeFormat("en-US", localeOptions).format(
                    new Date(searchParams.get("checkOutDate") as string)
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="font-bold mb-2">Guest count</div>
                <div className="mb-2">{searchParams.get("guestCount")}</div>
              </div>
            </div>

            <hr className="mb-2" />

            <div className="flex justify-between text-accent">
              <div className="font-bold text-sm md:text-base">
                Total amount:
              </div>
              <div className="text-sm md:text-base font-bold">{`₱ ${searchParams.get(
                "balance"
              )}.00`}</div>
            </div>

            <hr className="mb-2" />

            <div className="mt-auto">
              <Checkbox
                checked={checked}
                onChange={() => setChecked(!checked)}
                className="mb-4"
              >
                <span className="text-sm md:text-base">
                  I confirm that the information I have provided is true and
                  correct
                </span>
              </Checkbox>
              {loading ? (
                <div className="w-full">
                  <Center>
                    <Spinner color="blue.500" />
                  </Center>
                </div>
              ) : (
                <button
                  className={
                    allFormsValid()
                      ? `action-button w-full`
                      : `disabled-action-button w-full`
                  }
                  disabled={!allFormsValid()}
                  onClick={handleClick}
                >
                  Confirm Payment
                </button>
              )}
            </div>
          </section>
        </div>
      </Center>
    </>
  );
}

export default Payment;
