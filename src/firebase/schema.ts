// export let testData: Room = {
//   roomId: 1,
//   roomName: "Room 1",
//   roomDescription: "This is room 1",
//   roomCapacity: 10,
//   roomClassification: "Presidential",
//   roomHourlyRate: 1200,
//   roomBeds: {
//     bedCount: 1,
//     bedSize: "King",
//   },
//   roomFeatures: {
//     hasCityView: true,
//     hasPrivatePool: true,
//     hasShower: true,
//     isPetFriendly: false,
//   },
//   roomImages: {
//     img1: "https://images.pexels.com/photos/70441/pexels-photo-70441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     img2: "https://images.pexels.com/photos/70441/pexels-photo-70441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     img3: "https://images.pexels.com/photos/70441/pexels-photo-70441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//   },
//   occupancyDetails: {
//     isOccupied: false,
//     transId: "abc",
//     startDate: "2021-01-01",
//     endDate: "2021-01-02",
//   },
// };

export interface Room {
  roomId: number;
  roomName: string;
  roomDescription: string;
  roomCapacity: number;
  roomClassification: string;
  roomHourlyRate: number;
  roomBeds: {
    bedCount: number;
    bedSize: string;
  };
  roomFeatures: {
    hasCityView: boolean;
    hasPrivatePool: boolean;
    hasShower: boolean;
    isPetFriendly: boolean;
  };
  roomImages: {
    img1: string;
    img2: string;
    img3: string;
  };
  occupancyDetails: {
    isOccupied: boolean;
    transId: string;
    startDate: string;
    endDate: string;
  };
}