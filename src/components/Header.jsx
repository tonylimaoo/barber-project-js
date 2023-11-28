import { useEffect } from 'react'
import './Styles/header.css'
import { Link } from 'react-router-dom'
import { useAuthentication } from '../hooks/useAuthentication';
import { useAuthValue } from '../context/AuthContext';

export default function Header({showMenu, setShowMenu}) {

    const { user } = useAuthValue();
    const { logout } = useAuthentication();

    const handleMenuOptionClick = () => {
        document.querySelector('.menu').classList.remove('active');
    }

    useEffect(() => {
        if (showMenu) {
            document.querySelector('.menu').classList.add('active');
        } else {
            document.querySelector('.menu').classList.remove('active');
        }
    },[showMenu])

    return (
        <>
            <header className="header">
                <div className="navbar">
                    <Link to='/' className="logo">
                        Salão Lima 
                    </Link>
                    <div className="hamburger" onClick={() => setShowMenu(showMenu ? false : true)}>Menu</div>

                    <nav className="menu">
                        <Link to='/' onClick={handleMenuOptionClick} className="link">Agendamento</Link>

                        <Link to='/controle' onClick={handleMenuOptionClick} className="link">Horários</Link>

                        {user &&
                            <Link to='/profile' onClick={handleMenuOptionClick} className="link">Meu Perfil</Link>
                        }
                        {!user && <Link to="/signup">Cadastro</Link>}
                        {user ?
                            <Link onClick={() => {
                                logout();
                                handleMenuOptionClick();
                            }}>Sair</Link>
                            :
                            <>
                                <Link to='/login' onClick={handleMenuOptionClick} className="link">Login</Link>
                            </>
                        }
                    </nav>
                </div>
            </header>
        </>
    )
}