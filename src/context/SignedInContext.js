import { createContext } from "react";
import { useAuth } from "../hooks/useAuth";

export const SignedInContext = createContext();

export const SignedInContextProvider = ({ children }) => {
    const { authUser, setAuthUser } = useAuth();

    return (
        <SignedInContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </SignedInContext.Provider>
    )
}