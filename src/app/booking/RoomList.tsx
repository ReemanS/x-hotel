"use client";
import { Center } from "@chakra-ui/layout";
import React, { useState, useEffect } from "react";
import { getAllRoomsArray, getRoomsByCriteria } from "@/firebase/config";
import { Room, FormValues } from "@/firebase/schema";

function RoomList({ formValues }: { formValues: FormValues }) {
  const [allRooms, setAllRooms] = useState<Room[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    async function fetchRooms() {
      const roomsArray = await getAllRoomsArray();
      setAllRooms(roomsArray as Room[]);
      setRooms(roomsArray as Room[]);
    }
    fetchRooms();
  }, []);
  // effect for fetching rooms by criteria from formValues
  // useEffect(() => {
  //   async function fetchRoomsByCriteria() {
  //     const roomsArray = await getRoomsByCriteria(formValues);
  //     setRooms(roomsArray as Room[]);
  //   }
  //   fetchRoomsByCriteria();
  // }, [formValues]);

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
        <div className="font-bold font-merriweather text-2xl">All Rooms</div>
      </div>

      {rooms.length > 0 ? (
        rooms.map((room, idx) => {
          return (
            <div key={idx} className="w-2/3 lg:w-1/2">
              <div className="flex flex-row justify-between">
                <div className="font-bold font-merriweather text-2xl">
                  {room.roomName}
                </div>
                <div className="font-bold font-merriweather text-2xl">
                  {room.roomCapacity}
                </div>
              </div>
              <div className="font-bold font-merriweather text-2xl">
                {room.roomDescription}
              </div>
            </div>
          );
        })
      ) : (
        <div>Loading...</div>
      )}
    </Center>
  );
}

export default RoomList;
