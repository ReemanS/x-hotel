// export let testData: Room = {
//   roomName: "Room 1",
//   roomDescription: "This is room 1",
//   roomCapacity: 10,
//   roomClassification: "Presidential",
//   roomHourlyRate: 1200,
//   bedCount: 1,
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
//     startDate: new Date(2021, 0, 1),
//     endDate: new Date(2021, 0, 2),
//   },
// };

export interface Room {
  roomNumber: number;
  roomName: string;
  roomDescription: string;
  roomCapacity: number;
  roomClassification: string;
  roomDailyRate: number;
  bedCount: number;
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
    startDate: Date | string;
    endDate: Date | string;
  };
}

export interface FormValues {
  checkInDate: Date | string;
  checkOutDate: Date | string;
  guestCount: number;
  classification: string;
  features: FormRoomFeatures;
}

export interface FormRoomFeatures {
  hasCityView: boolean;
  hasPrivatePool: boolean;
  hasShower: boolean;
  isPetFriendly: boolean;
}

export interface Transaction {
  transId: string;
  transAmount: number;
  transDate: Date | string;
  guestCount: number;
  roomDetails: {
    roomNumber: number;
    startDate: Date | string;
    endDate: Date | string;
  };
  customerName: string;
  customerPhoneNumber: string;
  paymentMethod: string;
}

export interface OccupancyData {
  roomName: string;
  roomNumber: number;
  checkInDate: Date | string;
  checkOutDate: Date | string;
  guestCount: number;
  balance: number;
  customerName: string;
  customerPhoneNumber: string;
}
