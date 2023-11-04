"use client";
import { Center } from "@chakra-ui/layout";
import React, { useState, useEffect } from "react";
import { getAllRoomsArray } from "@/firebase/config";
import { Room, FormValues } from "@/firebase/schema";
import { AiFillStar } from "react-icons/ai";
import { BiSolidCity, BiSolidShower, BiSolidBed } from "react-icons/bi";
import { PiSwimmingPoolFill } from "react-icons/pi";
import { MdPets } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import RoomModal from "./RoomModal";

function RoomList({ formValues }: { formValues: FormValues }) {
  const [allRooms, setAllRooms] = useState<Room[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [openRoomIndex, setOpenRoomIndex] = useState(-1);

  // Effect for fetching all rooms
  useEffect(() => {
    async function fetchRooms() {
      const roomsArray = await getAllRoomsArray();
      setAllRooms(roomsArray as Room[]);
      setRooms(roomsArray as Room[]);
    }
    fetchRooms();
  }, []);

  // Effect for managing loading state
  useEffect(() => {
    setIsLoading((prev) => !prev);
  }, [allRooms]);

  // Effect for fetching rooms by criteria from formValues
  useEffect(() => {
    let tempRooms: Room[] = [];
    allRooms.map((room) => {
      if (
        !isDateBetween(
          formValues.checkInDate,
          room.occupancyDetails.startDate,
          room.occupancyDetails.endDate
        ) &&
        isWithinCapacity(formValues.guestCount, room.roomCapacity) &&
        (formValues.classification === "" ||
          formValues.classification === room.roomClassification) &&
        hasDesiredFeatures(formValues, room.roomFeatures)
      ) {
        tempRooms.push(room);
      } else {
        console.log(
          `[RoomList.tsx (formValues search)]: ${room.roomName} not added because:`
        );
        console.log(
          `[RoomList.tsx (formValues search)]: isDateBetween: ${!isDateBetween(
            formValues.checkInDate,
            room.occupancyDetails.startDate,
            room.occupancyDetails.endDate
          )}`
        );
        console.log(
          `[RoomList.tsx (formValues search)]: isWithinCapacity: ${isWithinCapacity(
            formValues.guestCount,
            room.roomCapacity
          )}`
        );
        console.log(
          `[RoomList.tsx (formValues search)]: classification: ${
            formValues.classification === "" ||
            formValues.classification === room.roomClassification
          }`
        );
        console.log(
          `[RoomList.tsx (formValues search)]: hasDesiredFeatures: ${hasDesiredFeatures(
            formValues,
            room.roomFeatures
          )}`
        );
      }
    });
    setRooms(tempRooms);
  }, [formValues]);

  // Utility functions
  const isDateBetween = (
    date: Date | string,
    startDate: Date | string,
    endDate: Date | string
  ) => {
    if (startDate === "" || endDate === "") {
      console.log(
        `[RoomList.tsx]: output of isDateBetween function: false because startDate or endDate is empty`
      );
      return false;
    }
    console.log(
      `[RoomList.tsx]: output of isDateBetween function: ${
        date >= startDate && date <= endDate
      }`
    );
    return date >= startDate && date <= endDate;
  };

  const isWithinCapacity = (guestCount: number, roomCapacity: number) => {
    return guestCount <= roomCapacity;
  };

  const hasDesiredFeatures = (
    desiredFeatures: FormValues,
    availableFeatures: Room["roomFeatures"]
  ) => {
    return (
      (!desiredFeatures.features.hasCityView ||
        availableFeatures.hasCityView) &&
      (!desiredFeatures.features.hasPrivatePool ||
        availableFeatures.hasPrivatePool) &&
      (!desiredFeatures.features.hasShower || availableFeatures.hasShower) &&
      (!desiredFeatures.features.isPetFriendly ||
        availableFeatures.isPetFriendly)
    );
  };

  const displayClassificationIcons = (classification: string) => {
    if (classification === "Presidential") {
      return (
        <div className="flex">
          <AiFillStar className=" text-primary" />
          <AiFillStar className=" text-primary" />
          <AiFillStar className="mr-1 text-primary" />
        </div>
      );
    } else if (classification === "Deluxe") {
      return (
        <div className="flex">
          <AiFillStar className=" text-primary" />
          <AiFillStar className="mr-1 text-primary" />
        </div>
      );
    } else if (classification === "Standard") {
      return <AiFillStar className="mr-1 text-primary" />;
    }
  };

  return (
    <Center className="md:mt-8 mt-6 flex flex-col">
      <div className="w-2/3">
        <div className="font-bold text-2xl mb-2">Our rooms</div>
      </div>

      {isLoading ? (
        rooms.length > 0 ? (
          rooms.map((room, idx) => {
            return (
              <article
                key={idx}
                className="w-2/3 h-full md:h-64 flex flex-col md:flex-row p-3 mb-3 rounded-md bg-primary/5 text-text hover:bg-primary/10 active:bg-accent/20 duration-200 cursor-pointer"
                onClick={() => setOpenRoomIndex(idx)}
              >
                <Modal
                  isOpen={openRoomIndex === idx}
                  onClose={() => setOpenRoomIndex(-1)}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>{room.roomName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <div>HelloHello</div>
                    </ModalBody>

                    <ModalFooter>
                      <Button
                        colorScheme="blue"
                        mr={3}
                        onClick={() => setOpenRoomIndex(-1)}
                      >
                        Close
                      </Button>
                      <Button variant="ghost">Secondary Action</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
                <img
                  src={room.roomImages.img1}
                  className="object-cover mb-2 md:mb-0 sm:w-full lg:max-w-[33%] mr-3 rounded"
                />
                <div className="w-full">
                  <div className="font-merriweather text-2xl font-bold">
                    {room.roomName}
                  </div>
                  <div className="font-poppins text-sm flex items-center mb-2">
                    {displayClassificationIcons(room.roomClassification)}
                    {room.roomClassification}
                  </div>
                  <div className="font-poppins text-md">
                    {room.roomDescription}
                  </div>
                  <div className="flex font-poppins">
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
                    <div>
                      <div className="font-bold">Capacity</div>
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
                          {room.roomBeds.bedCount} {room.roomBeds.bedSize}{" "}
                          {room.roomBeds.bedCount > 1
                            ? "size beds"
                            : "size bed"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          <div>No rooms found</div>
        )
      ) : (
        <div>Loading</div>
      )}
    </Center>
  );
}

export default RoomList;
