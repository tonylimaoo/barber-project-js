import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, query, onSnapshot, where } from "firebase/firestore";


export const useAdmin = (user) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // cleanup
    //deal with memory leak
    const [cancelled] = useState(false);
    const [isAdmin, setIsAdmin] = useState(null);


    useEffect(() => {
        if (user) {

            const userId = user.uid;

            const checkIfIsAdmin = async () => {

                setLoading(true);

                const collectionRef = await collection(db, 'users');

                try {
                    const q = await query(
                        collectionRef,
                        where("id", "==", userId),
                    );

                    await onSnapshot(q, (querySnapshot) => {
                        setIsAdmin(
                            querySnapshot.docs[0].data().admin
                        );
                    })
                    
                    setLoading(false);
                } catch (e) {
                    setError(e)
                    setLoading(false);
                }
            }

            checkIfIsAdmin();

        } else {
            setIsAdmin(false)
        }
        
        
    }, [user, cancelled])

    // useEffect(() => {
    //     if (isAdmin !== null) setCancelled(true);
    // }, [])

    return { isAdmin, loading, error }

}