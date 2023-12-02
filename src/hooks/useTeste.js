import { useEffect, useState } from "react"
import { db } from "../firebase/config";
import { collection, query, orderBy, onSnapshot, where, QuerySnapshot } from "firebase/firestore";

export const useTeste = (docCollection, date) => {

    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            // if (cancelled) return;
    
            setLoading(true);
    
            const collectionRef = await collection(db, docCollection);

            // console.log(collectionRef)
    
            try {
    
                let q = await query(
                    collectionRef,
                    // orderBy("hour"),
                    where("date", "==", date)
                )
    
                await onSnapshot(q, (querySnapshot) => {

                    querySnapshot.docs.map((doc) => console.log(doc.data()))
                    setDocuments(
                        querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    );
                })
    
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
    
            setLoading(false);
        }
    

        loadData();
    }, [date, docCollection])

    return { documents, loading, error }
}