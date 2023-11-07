import React, { useState, useContext, useEffect } from 'react'
import { SignUpContext } from '../context/SignUpContext'
import LoginForm from '../components/LoginForm'
import styles from './Login.module.css'
import { signInWithEmailAndPassword } from "firebase/auth"
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/config'
import SignupForm from '../components/SignUpForm'
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch'
import { addDataFirestore } from '../firebase/post'


const urls = [
  'http://localhost:3000/users'
]

const Login = () => {

  const navigate = useNavigate();
  const [type, setType] = useState("login");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");

  const {
    name,
    setName,
    email,
    setEmail,
    birthday,
    setBirthday,
    cellphone,
    setCellphone
  } = useContext(SignUpContext);

  const { httpConfig } = useFetch(urls[0]);

  useEffect(() => {
    localStorage.setItem("userId", userId);
  }, [userId])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === 'login') {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);

          setUserId(auth.currentUser.uid);
          setTimeout(() => {
            navigate("/my-profile")
          }, 1000)
        })
        .catch((error) => {
          console.log(error);
        });

    } else if (type === 'signup') {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);

          const data = {
            name: name,
            email: email,
            birthday: birthday,
            cellphone: cellphone,
            id: auth.currentUser.uid,
            admin: false
          }

          setUserId(auth.currentUser.uid);
          // Firestore
          addDataFirestore(data, "users");
          // Backend
          httpConfig(data, "POST");
          setTimeout(() => {
            navigate("/my-profile");
          }, 1000)
        })
        .catch((error) => {
          console.log(error);
        });

    }
  }

  console.log("type: " + type)

  return (
    <div className={styles.container}>
      {type === 'login' &&
        <LoginForm
          setEmail={setEmail}
          setPassword={setPassword}
          email={email}
          password={password}
          handleSubmit={handleSubmit}
        />}
      {type === 'signup' &&
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
        />}

      {type === 'login' && <button className={styles.signBtn} onClick={() => setType("signup")} >CADASTRE</button>}
      {type === 'signup' && <button className={styles.signBtn} onClick={() => setType("login")} >LOGIN</button>}
    </div>
  )
}

export default Login