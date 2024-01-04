import { useState } from "react";
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";


export const useDeleteDocument = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // deal with memory leak
    // const [cancelled, setCancelled] = useState(false);

    async function deleteData(docCollection, id) {
        setLoading(true)
        try {
            await deleteDoc(doc(db, docCollection, id));
            console.log('doc deleted')
            setLoading(false)
        } catch (error) {
            console.log(error.message)
            setError(error.message)
            setLoading(false)
        }
    }

    return { deleteData, loading, error };
};