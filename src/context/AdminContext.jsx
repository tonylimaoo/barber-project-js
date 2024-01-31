import { useContext, createContext } from "react";
import { useAdmin } from "../hooks/useAdmin";
import { useAuthValue } from "./AuthContext";

const AdminContext = createContext();

export function AdminContextProvider({ children }) {
    const { user } = useAuthValue();
    const { isAdmin } = useAdmin(user);

    return <AdminContext.Provider value={{ isAdmin }}>{children}</AdminContext.Provider>;
}

export function useAdminValue() {
    return useContext(AdminContext);
}