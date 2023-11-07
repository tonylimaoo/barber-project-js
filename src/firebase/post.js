import { db } from "./config";
import { collection, addDoc } from "firebase/firestore";

export const addDataFirestore = async (body, collectionName) => {
    try {
        const docRef = await addDoc(collection(db, collectionName), body);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}