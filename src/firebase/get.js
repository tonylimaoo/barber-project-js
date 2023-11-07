import { collection, getDocs } from "firebase/firestore";
import { db } from "./config";

export const getDocsFirestore = async (collectionName) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    querySnapshot.forEach((doc) => {
        console.log(doc.data());
    });
} 
