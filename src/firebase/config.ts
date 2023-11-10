// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  child,
  get,
  onValue,
  push,
  query,
  equalTo,
  endBefore,
  orderByKey,
  orderByChild,
  limitToFirst,
} from "firebase/database";
import { Room, FormValues, Transaction, OccupancyData } from "./schema";
import axios from "axios";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const url = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;

// CRUD functions
// Create
// export async function createToDb(path: string, data: Room) {
//   const dbRef = ref(db, path);
//   try {
//     await set(dbRef, data);
//   } catch (error) {
//     console.log(error);
//   }
// }

let emptyRoom: Room = {
  roomNumber: 0,
  roomName: "",
  roomDescription: "",
  roomCapacity: 0,
  roomClassification: "",
  roomDailyRate: 0,
  bedCount: 0,
  roomFeatures: {
    hasCityView: false,
    hasPrivatePool: false,
    hasShower: false,
    isPetFriendly: false,
  },
  roomImages: {
    img1: "",
    img2: "",
    img3: "",
  },
  occupancyDetails: {
    isOccupied: false,
    transId: "",
    startDate: "",
    endDate: "",
  },
};

// Create room
export async function createRoom(data: Room) {
  const dbRef = ref(db, "Rooms/");
  try {
    const newRoom = await push(dbRef);
    await set(newRoom, data);
  } catch (error) {
    console.log(error);
  }
}

// function that returns all rooms
export async function getAllRooms() {
  const dbRef = ref(db);
  get(child(dbRef, "Rooms/"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return { error: "No data available" };
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

// function that returns all rooms as an array
export function getAllRoomsArray(): Promise<{ [x: string]: any }[]> {
  return new Promise((resolve, reject) => {
    const dbRef = ref(db, "Rooms/");
    onValue(
      dbRef,
      (snapshot) => {
        let data: { [x: string]: any }[] = [];
        snapshot.forEach((childSnapshot) => {
          data.push(childSnapshot.val());
          console.log("[schema.ts] childSnapshop.val():");
          console.log(childSnapshot.val());
        });
        console.log(data);
        resolve(data);
      },
      (error) => {
        reject(error);
      },
      {
        onlyOnce: true,
      }
    );
  });
}

// function that returns rooms by criteria from formValues
export function getRoomsByCriteria(
  formValues: FormValues
): Promise<{ [x: string]: any }[]> {
  return new Promise((resolve, reject) => {
    console.log(`[schema.ts] formValues: ${JSON.stringify(formValues)}`);
    const dbRef = ref(db, "Rooms/");
    const roomQuery = query(
      dbRef,
      orderByChild("roomClassification"),
      formValues.classification !== ""
        ? equalTo(formValues.classification)
        : limitToFirst(50)
    );
    onValue(
      roomQuery,
      (snapshot) => {
        let data: { [x: string]: any }[] = [];
        snapshot.forEach((childSnapshot) => {
          data.push(childSnapshot.val());
        });
        console.log("[schema.ts] data: ");
        console.log(data);
        resolve(data);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

// function that edits a certain room
export async function editRoomOccupancyDetails(
  occupancyData: OccupancyData
): Promise<string> {
  try {
    const dbRef = ref(db, "Rooms/");
    const roomQuery = query(
      dbRef,
      orderByChild("roomNumber"),
      equalTo(occupancyData.roomNumber)
    );
    const snapshot = await get(roomQuery);
    let generatedId: string = "";

    snapshot.forEach((childSnapshot) => {
      const data: Room = childSnapshot.val();
      if (data.roomName === occupancyData.roomName) {
        generatedId = crypto.randomUUID();
        set(ref(db, `Rooms/${childSnapshot.key}/occupancyDetails/`), {
          isOccupied: true,
          transId: generatedId,
          startDate: occupancyData.checkInDate as string,
          endDate: occupancyData.checkOutDate as string,
        });
      }
    });
    return generatedId;
  } catch (error) {
    console.log(error);
    return "";
  }
}

export async function addToTransactions(
  transaction: Transaction
): Promise<string> {
  try {
    const dbRef = ref(db, "Transactions/");
    await push(dbRef, transaction);
    return transaction.transId;
  } catch (error) {
    console.log(error);
    return "";
  }
}

// it is at this point that we discovered that realtime database has a REST API
// :/

export async function addToTransactionsHttps(transaction: Transaction) {
  // add using axios
  try {
    const response = await axios.post(`${url}/Transactions.json`, transaction);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
