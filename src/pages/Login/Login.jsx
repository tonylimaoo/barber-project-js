import React, { useState, useContext, useEffect } from 'react'
import LoginForm from '../../components/LoginForm'
import './Login.css'
import SignupForm from '../../components/SignUpForm'
import { useNavigate } from 'react-router-dom';
import { addDataFirestore } from '../../firebase/post'
import { useAuthentication } from '../../hooks/useAuthentication'
import { useAuthValue } from '../../context/AuthContext';

const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const { user: userID } = useAuthValue();
  const { login, error: authError, loading } = useAuthentication();

  
  useEffect(() => {
    localStorage.setItem("userId", userId);
  }, [userId])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const user = {
      email: email,
      password: password
    }

    
    const res = await login (user);
    
    
    console.log("na funça");
    // console.log(userID);
    
    console.log(res);

    if (res !== undefined) {
      navigate('/my-profile');
    }
  }

  return (
    <div className="container-login">
      <LoginForm
        setEmail={setEmail}
        setPassword={setPassword}
        email={email}
        password={password}
        handleSubmit={handleSubmit}
      />
      {authError &&
        <p className='error'>{authError}</p>
      }
    </div>
  )
}

export default Login