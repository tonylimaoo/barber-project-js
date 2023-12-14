import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, query, orderBy, onSnapshot, where } from "firebase/firestore";

export const useFetchEnabledHours = (
    docCollection,
    professional,
    date
) => {

    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        
        const loadData = async () => {
            setLoading(true);

            const collectionRef = await collection(db, docCollection);


            if (professional === '' || date === '') {
                return
            }

            try {
                let q;

                q = await query(
                    collectionRef,
                    where("date", "==", date),
                    where("professional", "==", professional),
                    orderBy('createdAt', 'desc')
                );

                await onSnapshot(q, (querySnapshot) => {
                    setDocuments(
                        querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    );
                })
                setLoading(false);

            } catch (e) {
                console.log(error);
                setError(error);
                setLoading(false);
            }

        }

        loadData();
    }, [docCollection, professional, date, error])

    return { documents, loading, error };
};