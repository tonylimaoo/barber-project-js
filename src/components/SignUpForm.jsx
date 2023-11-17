import React from 'react'
import './Styles/signup-form.css'

const SignupForm = ({
    setEmail,
    setPassword,
    setName,
    setBirthday,
    setCellphone,
    email,
    password,
    name,
    birthday,
    cellphone,
    handleSubmit,
    authError,
    loading
}) => {
    return (
        <>
            <section className='form-section'>
                <h1 className='form-title'>Cadastro</h1>
                <form
                    onSubmit={handleSubmit}
                    className='signup-form'
                >
                    <label>
                        <span>Nome completo</span>
                        <input
                            type="text"
                            name='nome'
                            placeholder='Digite seu nome completo'
                            required
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </label>
                    <label>
                        <span>Data de nascimento</span>
                        <input
                            type="date"
                            name='birthday'
                            required
                            onChange={(e) => setBirthday(e.target.value)}
                            value={birthday}
                        />
                    </label>
                    <label>
                        <span>Celular</span>
                        <input
                            type="number"
                            name='celphone'
                            required
                            onChange={(e) => setCellphone(e.target.value)}
                            value={cellphone}
                        />
                    </label>
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
                    {loading ?
                        <button type='submit'>AGUARDE</button> :
                        <button type='submit'>CADASTRE-SE</button>
                    }
                </form>
            </section>
            {authError &&
                <p className="error">{authError}</p>
            }
        </>
    )
}

export default SignupForm