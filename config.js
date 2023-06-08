// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDXrm9m1ngXdLAivso8T2nLlfTBnGgh9xw",
  authDomain: "socialapp-19676.firebaseapp.com",
  databaseURL:
    "https://socialapp-19676-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "socialapp-19676",
  storageBucket: "socialapp-19676.appspot.com",
  messagingSenderId: "724460431073",
  appId: "1:724460431073:web:381038ab9318c827b079a0",
  measurementId: "G-4X2SDX07TP",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
