import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, query, orderBy, onSnapshot, where } from "firebase/firestore";

export const useFetchAppointments = (docCollection, date) => {

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

            if (date) {
                try {

                    let q = await query(
                        collectionRef,
                        orderBy("hours_index", "asc"),
                        where("date", "==", date)
                    )

                    await onSnapshot(q, (querySnapshot) => {
                        setDocuments(
                            querySnapshot.docs.map((doc) => ({
                                id: doc.id,
                                ...doc.data(),
                            }))
                        );
                    })

                } catch (error) {
                    setError(error);
                    setLoading(false);
                }

                setLoading(false);
            }
        }


        loadData();

    }, [date, docCollection, cancelled])

    useEffect(() => {
        setCancelled(true);
    }, [])

    return { documents, loading, error };
};