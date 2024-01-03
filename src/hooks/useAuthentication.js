import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth';

import { useState, useEffect } from 'react';

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    //cleanup
    //deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    // register
    const createUser = async (data) => {
        checkIfIsCancelled();

        setLoading(true);
        setError(null);

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            await updateProfile(user, {
                displayName: data.displayName
            });

            setLoading(false);

            return user;
        } catch (error) {

            let systemErrorMessage;

            if(error.message.includes("weak-password")) {
                systemErrorMessage = "A senha deve conter pelo menos 6 dígitos."
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "Email já cadastrado."
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tente novamente mais tarde."
            }

            setError(systemErrorMessage);
            setLoading(false);
        }

    }

    // logout
    const logout = () => {
        checkIfIsCancelled();

        signOut(auth)
    }

    // login
    const login = async (data) => {
        
        checkIfIsCancelled();

        setLoading(true)
        setError(false)

        try{

            await signInWithEmailAndPassword(auth, data.email, data.password);
            setLoading(false);

        } catch(error) {

            let systemErrorMessage;
            console.log(error.message)
            if(error.message.includes("invalid-login")) {
                systemErrorMessage = "Wrong email and/or password."
            } else if (error.message.includes("wrong-password")) {
                systemErrorMessage = "Incorrect password."
            } else {
                systemErrorMessage = "Error, please try again later."
            }
            
            setLoading(false);
            setError(systemErrorMessage);
        }

    }


    useEffect(() => {
        return () => setCancelled(true);
    }, [])

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    }
}