import { createContext, useEffect, useState, useContext } from "react";
import { SignedInContext } from "./SignedInContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase/config'

export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {

    const { authUser } = useContext(SignedInContext);
    const [userId, setUserId] = useState("");
    const [isAdmin, setIsAdmin] = useState("");

    useEffect(() => {
        setUserId(localStorage.getItem('userId'));
    }, [authUser]);

    useEffect(() => {

        const getFirestoreAdmin = async () => {

            const data = [];
            const q = query(collection(db, "users"), where("id", "==", userId));
    
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                data.push(doc.data().admin);
                setIsAdmin(data[0]);
            });
        };

        getFirestoreAdmin();

    }, [userId]);

    return (
        <AdminContext.Provider value={{
            isAdmin, setUserId
        }}>
            {children}
        </AdminContext.Provider>
    )
}