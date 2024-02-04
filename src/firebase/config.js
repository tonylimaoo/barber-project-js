import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvPGHyaph4X4MyLkzggBH3q0U7w3NgCQU",
  authDomain: "barber-project-d75f8.firebaseapp.com",
  databaseURL: "https://barber-project-d75f8-default-rtdb.firebaseio.com",
  projectId: "barber-project-d75f8",
  storageBucket: "barber-project-d75f8.appspot.com",
  messagingSenderId: "122062340578",
  appId: "1:122062340578:web:31fc3c1453fef4b79c79bb"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyBgcFpNB1CbnAfXrbQlO0vaRzthkQD0JD4",
//   authDomain: "develop-barber-project.firebaseapp.com",
//   projectId: "develop-barber-project",
//   storageBucket: "develop-barber-project.appspot.com",
//   messagingSenderId: "663186131470",
//   appId: "1:663186131470:web:a7872e348295b4a1c54a5f"
// };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);