import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import styles from './Login.module.css'
import { signInWithEmailAndPassword } from "firebase/auth"
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import SignupForm from '../components/SignUpForm'

const Login = () => {

  const [type, setType] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    if (type === 'login') {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (type === 'signup') {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  console.log(type)

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
          email={email}
          password={password}
          handleSubmit={handleSubmit}
        />}

      {type === 'login' && <button className={styles.signBtn} onClick={() => setType("signup")} >Cadastre-se</button>}
      {type === 'signup' && <button className={styles.signBtn} onClick={() => setType("login")} >Entre com sua conta</button>}
    </div>
  )
}

export default Login