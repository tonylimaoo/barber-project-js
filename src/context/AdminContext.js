import { createContext, useEffect, useState, useContext } from "react";
import { SignedInContext } from "./SignedInContext";

export const AdminContext = createContext();

const url = "http://localhost:3000/users/"

export const AdminContextProvider = ({ children }) => {

    const { authUser } = useContext(SignedInContext);
    const [userId, setUserId] = useState("");
    const [isAdmin, setIsAdmin] = useState("");

    useEffect(() => {
        setUserId(localStorage.getItem('userId'));
    }, [authUser]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(url + userId);
            const json = await res.json();
            setIsAdmin(json.admin);
        };
        fetchData();
    }, [userId]);
    
    return (
        <AdminContext.Provider value={{
            isAdmin
        }}>
            {children}
        </AdminContext.Provider>
    )
}