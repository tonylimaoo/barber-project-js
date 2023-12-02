import React from 'react'
import './signup-form.css'

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

    const handleCelChange = (e) => {

        const target = e.target.value.replace(/\(|\)|-| /g, '');

        if (target.match(/[a-zA-Z]/)){
            return;
        };

        if (target.length < 12) {
            setCellphone(e.target.value);
        } else {
            return;
        };

        let celArray = target.split('');

        if (e.target.value.length === 11) {
            celArray.splice(0, 0, '(');
            celArray.splice(3, 0, ')');
            celArray.splice(4, 0, ' ');
            celArray.splice(10, 0, '-');
            let cel = celArray.join('');
            setCellphone(cel);
        };
    }

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
                            type="text"
                            name='celphone'
                            required
                            onChange={(e) => handleCelChange(e)}
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

export default SignupForm;