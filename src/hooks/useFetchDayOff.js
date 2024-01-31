import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, query, orderBy, onSnapshot, where } from "firebase/firestore";

export const useFetchDayOff = (date = false) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const docCollection = 'day-off';

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
}