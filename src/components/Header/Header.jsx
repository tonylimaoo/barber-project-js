import { useEffect } from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import { useAuthentication } from '../../hooks/useAuthentication';
import { useAuthValue } from '../../context/AuthContext';
import { useAdminValue } from '../../context/AdminContext';
import menuImg from '../../assets/1024px-Hamburger_icon_white.svg.png'

export default function Header({ showMenu, setShowMenu }) {

    const { user } = useAuthValue();
    const { logout } = useAuthentication();
    const { isAdmin } = useAdminValue();

    const handleMenuOptionClick = () => {
        document.querySelector('.menu').classList.remove('active');
    }

    useEffect(() => {
        if (showMenu) {
            document.querySelector('.menu').classList.add('active');
        } else {
            document.querySelector('.menu').classList.remove('active');
        }
    }, [showMenu])

    return (
        <>
            <header className="header">
                <div className="navbar">
                    <Link to='/' className="logo">
                        <h1>SALÃO</h1>
                        <h1>LIMA</h1>
                        {/* <img src={logo} className='header-logo' alt="logo" /> */}
                    </Link>
                    <div className="hamburger" onClick={() => setShowMenu(showMenu ? false : true)}>
                        {/* Menu */}
                        <img src={menuImg} alt="menu" />
                    </div>

                    <nav className="menu">
                        <Link to='/' onClick={handleMenuOptionClick} className="link">Agendamento</Link>
                        {user && isAdmin &&
                            <Link to='/controle' onClick={handleMenuOptionClick} className="link">Admin</Link>
                        }
                        {user &&
                            <Link to='/profile' onClick={handleMenuOptionClick} className="link">Meu Perfil</Link>
                        }
                        {!user && <Link to="/signup" onClick={handleMenuOptionClick}>Cadastro</Link>}
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