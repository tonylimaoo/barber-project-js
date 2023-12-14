import React from 'react'
import './login-form.css'

const LoginForm = ({ setEmail, setPassword, email, password, handleSubmit }) => {
    return (
        <>
            <section className='login-form-section'>
                <h1 className='form-title'>Login</h1>
                <form
                    onSubmit={handleSubmit}
                    className="login-form"
                >
                    <label>
                        <span>Email</span>
                        <input
                            type="email"
                            name='email'
                            placeholder='Digite seu email'
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </label>
                    <label>
                        <span>Senha</span>
                        <input
                            type="password"
                            name='senha'
                            placeholder='Digite sua senha'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                    </label>
                    <button className='btn_login' type='submit'>LOGIN</button>
                </form>
            </section>
        </>
    )
}

export default LoginForm