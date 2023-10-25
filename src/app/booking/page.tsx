"use client";
import {
  Center,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { SetStateAction, useState } from "react";
import DatePicker from "react-datepicker";
import { LiaSearchSolid } from "react-icons/lia";
import "react-datepicker/dist/react-datepicker.css";

function Booking() {
  const roomClassifications = ["Presidential", "Deluxe", "Standard"];
  const roomFeatures = {
    hasCityView: false,
    hasPrivatePool: false,
    hasShower: false,
    isPetFriendly: false,
  };

  const [checkInDate, setCheckinDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [guestCount, setGuestCount] = useState(1);
  const [classification, setClassification] = useState("");
  const handleSelectClassification = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setClassification(event.target.value);
  };
  const [features, setFeatures] = useState<{ [key: string]: boolean }>(
    roomFeatures
  );
  const handleSelectFeatures = (feature: string) => {
    setFeatures({
      ...features,
      [feature]: !features[feature],
    });
  };

  const handleSearchClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault;
  };

  return (
    <main className="bg-background">
      <Center>
        <form className="flex flex-wrap w-2/3 lg:w-1/2 justify-center md:justify-normal bg-sky-50/25 p-4 rounded-md outline-dashed outline-1 outline-accent">
          <FormControl className="basis-40">
            <FormLabel>Check-in date</FormLabel>
            <DatePicker
              selected={checkInDate}
              onChange={(date) => setCheckinDate(date as SetStateAction<Date>)}
              className="h-10 p-1 duration-200 outline outline-1 outline-blue-50 hover:outline-secondary active:outline-2 active:outline-primary  w-32 bg-transparent rounded-md"
            />
          </FormControl>
          <FormControl className=" basis-40">
            <FormLabel>Check-out date</FormLabel>
            <DatePicker
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date as SetStateAction<Date>)}
              className="h-10 p-1 duration-200 outline outline-1 outline-blue-50 hover:outline-secondary active:outline-2 active:outline-primary  w-32 bg-transparent rounded-md"
            />
          </FormControl>
          <FormControl className=" basis-36 pe-8">
            <FormLabel>Guest count</FormLabel>
            <NumberInput
              min={1}
              value={guestCount}
              onChange={(newValue) => setGuestCount(parseInt(newValue))}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl className=" basis-56 grow pb-2 mr-2">
            <FormLabel>Classification</FormLabel>
            <Select
              placeholder="Select classification"
              value={classification}
              onChange={handleSelectClassification}
            >
              {roomClassifications.map((classification) => (
                <option
                  key={classification}
                  value={classification}
                  className="font-sans"
                >
                  {classification}
                </option>
              ))}
            </Select>
          </FormControl>
          <div className=" basis-96 pr-0 md:pr-6">
            <FormLabel>Features</FormLabel>
            <CheckboxGroup>
              <SimpleGrid columns={2} spacing={2}>
                <Checkbox
                  value="hasCityView"
                  checked={features[0]}
                  onChange={() => handleSelectFeatures("hasCityView")}
                  className=" text-sm md:text-base"
                >
                  With city view
                </Checkbox>
                <Checkbox
                  value="hasPrivatePool"
                  checked={features[1]}
                  onChange={() => handleSelectFeatures("hasPrivatePool")}
                  className=" text-sm md:text-base"
                >
                  With private pool
                </Checkbox>
                <Checkbox
                  value="hasShower"
                  checked={features[2]}
                  onChange={() => handleSelectFeatures("hasShower")}
                  className="text-sm md:text-base"
                >
                  With shower
                </Checkbox>
                <Checkbox
                  value="isPetFriendly"
                  checked={features[3]}
                  onChange={() => handleSelectFeatures("isPetFriendly")}
                  className=" text-sm md:text-base"
                >
                  Pet friendly
                </Checkbox>
              </SimpleGrid>
            </CheckboxGroup>
          </div>
          <div className="grow hidden md:block"></div>
          <button
            className="action-button flex items-center justify-self-end self-end text-xl mt-3"
            onClick={(e) => handleSearchClick(e)}
          >
            <LiaSearchSolid className="mr-2" />
            <span>Search</span>
          </button>
        </form>
      </Center>
    </main>
  );
}

export default Booking;
