import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, updateDoc } from "firebase/firestore";


export const useUpdateDocument = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // deal with memory leak
    // const [cancelled, setCancelled] = useState(false);

    async function updateData(docCollection, id, objToUpdate) {

        setLoading(true);

        const docRef = doc(db, docCollection, id);

        try {
            await updateDoc(docRef, objToUpdate);
            console.log('doc updated')
            setLoading(false)
        } catch (error) {
            console.log(error.message)
            setError(error.message)
            setLoading(false)
        }
    }

    return { updateData, loading, error };
};