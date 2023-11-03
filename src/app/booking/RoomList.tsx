"use client";
import { Center } from "@chakra-ui/layout";
import React, { useState, useEffect } from "react";
import { getAllRoomsArray, getRoomsByCriteria } from "@/firebase/config";
import { Room, FormValues } from "@/firebase/schema";

function RoomList({ formValues }: { formValues: FormValues }) {
  const [allRooms, setAllRooms] = useState<Room[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Effect for fetching all rooms
  useEffect(() => {
    async function fetchRooms() {
      const roomsArray = await getAllRoomsArray();
      setAllRooms(roomsArray as Room[]);
      setRooms(roomsArray as Room[]);
    }
    fetchRooms();
  }, []);
  // Effect for fetching rooms by criteria from formValues
  // useEffect(() => {
  //   async function fetchRoomsByCriteria() {
  //     const roomsArray = await getRoomsByCriteria(formValues);
  //     setRooms(roomsArray as Room[]);
  //   }
  //   fetchRoomsByCriteria();
  // }, [formValues]);

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

  // utility functions
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

  return (
    <Center className="md:mt-8 mt-6 bg-yellow-50 flex flex-col">
      <div className="w-2/3">
        <div className="font-bold text-2xl mb-2">Our rooms</div>
      </div>

      {isLoading ? (
        rooms.length > 0 ? (
          rooms.map((room, idx) => {
            return (
              <article key={idx} className="w-2/3 flex bg-rose-200 p-2">
                <div className="bg-orange-100 w-1/3 h-">
                  <img src={room.roomImages.img1} className="object-cover" />
                </div>
                <div className=""></div>
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
