import React from 'react'
import styles from './Styles/signup-form.module.css'

const SignupForm = ({ setEmail, setPassword, email, password, handleSubmit }) => {
    return (
        <>
            <section className={styles['form-section']}>
                <div className={styles['form-title']}>Cadastro</div>
                <form
                    onSubmit={handleSubmit}
                    className={styles.form}
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
                    <button type='submit'>CADASTRAR-SE</button>
                </form>
            </section>
        </>
    )
}

export default SignupForm