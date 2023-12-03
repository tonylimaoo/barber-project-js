import React, { useState, useEffect } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { useAuthentication } from '../../hooks/useAuthentication'

const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const { login, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password
    }

    const res = await login(user);

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