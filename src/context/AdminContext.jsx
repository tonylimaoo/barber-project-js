import { useContext, createContext, useEffect, useState } from "react";
import { useAdmin } from "../hooks/useAdmin";
import { useAuthValue } from "./AuthContext";

const AdminContext = createContext();

export function AdminContextProvider({ children }) {
    const { user } = useAuthValue();
    const { isAdmin } = useAdmin(user);

    // console.log(user.uid)
    // console.log(isAdmin)

    return <AdminContext.Provider value={{ isAdmin }}>{children}</AdminContext.Provider>;
}

export function useAdminValue() {
    return useContext(AdminContext);
}