"use client";
import { Center } from "@chakra-ui/layout";
import React, { useState, useEffect } from "react";
import { getAllRoomsArray } from "@/firebase/config";
import { Room } from "@/firebase/schema";

function RoomList() {
  const [rooms, setRooms] = useState<Room[]>([]);
  useEffect(() => {
    async function fetchRooms() {
      const roomsArray = await getAllRoomsArray();
      setRooms(roomsArray as Room[]);
    }
    fetchRooms();
  }, []);

  return (
    <Center className="md:mt-8 mt-6 bg-yellow-50 flex flex-col">
      <div className="w-2/3 lg:w-1/2">
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
