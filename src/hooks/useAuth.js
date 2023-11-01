import { useState, useEffect } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

export const useAuth = () => {
    const [authUser, setAuthUser] = useState();

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });

        return () => {
            listen();
        };
    }, [])

    return { authUser }
}
