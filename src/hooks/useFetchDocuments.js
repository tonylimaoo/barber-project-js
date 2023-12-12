import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, query, orderBy, onSnapshot, where, QuerySnapshot, limit } from "firebase/firestore";

export const useFetchDocuments = (docCollection, uid = null, transaction = false) => {

    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {

        async function loadData() {
            if (cancelled) return;

            setLoading(true);

            const collectionRef = await collection(db, docCollection);

            try {

                let q;

                // busca por uid
                if (uid && !transaction) {
                    q = await query(
                        collectionRef,
                        where("id", "==", uid),
                    );
                } else if (uid && transaction) {
                    q = await query(
                        collectionRef,
                        where("uid", "==", uid),
                        orderBy('createdAt', 'desc'),
                        limit(3)
                    );

                } else {
                    q = await query(collectionRef, orderBy("createdAt", "desc"))
                }


                await onSnapshot(q, (querySnapshot) => {
                    setDocuments(
                        querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    );
                })
                setLoading(false);
            } catch (error) {
                console.log(error);
                setError(error.message);
                setLoading(false);
            }
        }

        loadData();

    }, [docCollection, uid, cancelled, transaction])

    useEffect(() => {
        setCancelled(true);
    }, [])

    return { documents, loading, error };
};