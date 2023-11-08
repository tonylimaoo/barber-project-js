import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import styles from './Styles/header.module.css'
import { Link } from 'react-router-dom'

export default function Header({ userSignOut, authUser }) {

    const { isAdmin, setIsAdmin } = useContext(AdminContext);

    const handleClick = () => {
        userSignOut();
        localStorage.setItem("userId", "");
        setIsAdmin(false);
    }

    return (
        <>
            <nav className={styles.header}>
                <section className={styles.logo}>
                    Salão Lima
                </section>
                <section className={styles.nav}>
                    <Link to='/' className={styles.link}>Agendamento</Link>
                    {isAdmin &&
                        <Link to='/controle' className={styles.link}>Horários</Link>
                    }
                    {authUser &&
                        <Link to='/my-profile' className={styles.link}>Meu Perfil</Link>
                    }
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