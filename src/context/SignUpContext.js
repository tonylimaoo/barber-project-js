import { createContext, useState } from "react";

export const SignUpContext = createContext();

export const SignUpContextProvider = ({ children }) => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [birthday, setBirthday] = useState();
    const [cellphone, setCellphone] = useState();

    return (
        <SignUpContext.Provider value={{
            name,
            setName,
            email,
            setEmail,
            birthday,
            setBirthday,
            cellphone,
            setCellphone
        }}>
            {children}
        </SignUpContext.Provider>
    )
}