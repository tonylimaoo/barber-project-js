import { createContext, useEffect, useState } from "react";

export const AdminContext = createContext();

const url = "http://localhost:3000/users/"

export const AdminContextProvider = ({ children }) => {

    const [userId, setUserId] = useState("");
    const [isAdmin, setIsAdmin] = useState("");

    useEffect(() => {
        setUserId(localStorage.getItem('userId'));
    }, []);

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