import { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import './Styles/header.css'
import { Link } from 'react-router-dom'

export default function Header({ userSignOut, authUser }) {

    const { isAdmin, setIsAdmin } = useContext(AdminContext);
    const [showMenu, setShowMenu] = useState(false);

    const handleLogOutClick = () => {
        userSignOut();
        localStorage.setItem("userId", "");
        setIsAdmin(false);
    }

    const handleMenuOptionClick = () => {
        document.querySelector('.menu').classList.remove('active');
    }

    const handleHamburgerClick = (ele) => {
        setShowMenu(showMenu ? false : true)

        if (showMenu) {
            document.querySelector('.menu').classList.add('active');
        } else {
            document.querySelector('.menu').classList.remove('active');
        }
    }

    return (
        <>
            <header className="header">
                <div className="navbar">
                    <div className="logo">
                        Salão Lima
                    </div>
                    <div className="hamburger" onClick={(e) => handleHamburgerClick(e)}>Menu</div>
                    
                    <nav className="menu">
                        <Link to='/' onClick={handleMenuOptionClick} className="link">Agendamento</Link>
                        {isAdmin &&
                            <Link to='/controle' onClick={handleMenuOptionClick} className="link">Horários</Link>
                        }
                        {authUser &&
                            <Link to='/my-profile' onClick={handleMenuOptionClick} className="link">Meu Perfil</Link>
                        }
                        {authUser ?
                            <Link onClick={() => {
                                handleLogOutClick();
                                handleMenuOptionClick()
                            }}>Sair</Link>
                            :
                            <Link to='/login' onClick={handleMenuOptionClick} className="link">Login</Link>
                        }
                    </nav>
                </div>
            </header>
        </>
    )
}