import React from 'react'
import styles from './Styles/header.module.css'
import { Link } from 'react-router-dom'

export default function Header({ userSignOut, authUser }) {

    const handleClick = () => {
        userSignOut();
        localStorage.setItem("userId", "");
    }
    return (
        <>
            <nav className={styles.header}>
                <section className={styles.logo}>
                    Salão Lima
                </section>
                <section className={styles.nav}>
                    <Link to='/' className={styles.link}>Home</Link>
                    <Link to='/controle' className={styles.link}>Horários</Link>
                    <Link to='/my-profile' className={styles.link}>Meu Perfil</Link>
                    {authUser ?
                        <Link onClick={handleClick}>Sair</Link>
                        :
                        <Link to='/login' className={styles.link}>Login</Link>
                    }
                </section>
            </nav>
        </>
    )
}