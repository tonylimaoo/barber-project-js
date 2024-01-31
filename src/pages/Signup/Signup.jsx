import "./Signup.css"

import React, { useState } from 'react'

import SignupForm from '../../components/SignUpForm/SignUpForm'
import { useAuthentication } from '../../hooks/useAuthentication';
import { useNavigate } from "react-router-dom";
import { useInsertDocument } from "../../hooks/useInsertDocument";
// import { useAuthValue } from "../../context/AuthContext";

const Signup = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [cellphone, setCellphone] = useState("");
    const { setDocument, response } = useInsertDocument('users');

    const { createUser, error: authError, loading } = useAuthentication();

    const handleSubmit = async (e) => {

        e.preventDefault();

        const user = {
            name: name,
            email: email,
            password: password
        }

        // if (password !== consfirmPassword) {
        //     setError("The password does not match!")
        //     return;
        // }

        const res = await createUser(user);

        setDocument({
            name,
            email,
            birthday,
            cellphone,
            admin: false,
            id: res.uid
        }, res.uid)

        console.log(response)

        navigate('/profile');

    }

    // useEffect(() => {

    // }, [authUser])

    return (
        <div className="signup">
            <SignupForm
                setEmail={setEmail}
                setPassword={setPassword}
                setName={setName}
                setBirthday={setBirthday}
                setCellphone={setCellphone}
                email={email}
                password={password}
                name={name}
                birthday={birthday}
                cellphone={cellphone}
                handleSubmit={handleSubmit}
                authError={authError}
                loading={loading}
            />
        </div>
    )
}

export default Signup