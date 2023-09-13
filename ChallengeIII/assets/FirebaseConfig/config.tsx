import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBoA7d6bTqhZif73P7_Pslj9rH2CXSz5SM",
  authDomain: "challengeiii-a9728.firebaseapp.com",
  projectId: "challengeiii-a9728",
  storageBucket: "challengeiii-a9728.appspot.com",
  messagingSenderId: "803438859340",
  appId: "1:803438859340:web:e41266b9c4d406844310e9",
  measurementId: "G-37GSP48X60"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);