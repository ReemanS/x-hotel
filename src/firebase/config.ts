// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get, onValue } from "firebase/database";
import { Room } from "./schema";

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

// CRUD functions
// Create
export async function createToDb(path: string, data: Room) {
  const dbRef = ref(db, path);
  try {
    await set(dbRef, data);
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
        });
        console.log(data);
        resolve(data);
      },
      (error) => {
        reject(error);
      }
    );
  });
}
