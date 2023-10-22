// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
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
