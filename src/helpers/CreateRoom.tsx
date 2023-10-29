import React from "react";
import { createRoom } from "@/firebase/config";
import { Room } from "@/firebase/schema";

function CreateRoom() {
  const data: Room = {
    roomName: "VIP Penthouse",
    roomDescription:
      "Experience luxury at its finest in this penthouse suite with a private pool and city view.",
    roomCapacity: 2,
    roomClassification: "Presidential",
    roomHourlyRate: 200,
    roomBeds: {
      bedCount: 1,
      bedSize: "King",
    },
    roomFeatures: {
      hasCityView: true,
      hasPrivatePool: true,
      hasShower: true,
      isPetFriendly: false,
    },
    roomImages: {
      img1: "https://firebasestorage.googleapis.com/v0/b/x-hotel-451cb.appspot.com/o/penthouse1.jpg?alt=media",
      img2: "https://firebasestorage.googleapis.com/v0/b/x-hotel-451cb.appspot.com/o/penthouse2.jpg?alt=media",
      img3: "https://firebasestorage.googleapis.com/v0/b/x-hotel-451cb.appspot.com/o/penthouse3.jpg?alt=media",
    },
    occupancyDetails: {
      isOccupied: false,
      transId: "",
      startDate: "",
      endDate: "",
    },
  };
  return (
    <div>
      <button onClick={() => createRoom(data)} className="bg-green-300">
        Create Room
      </button>
    </div>
  );
}

export default CreateRoom;
