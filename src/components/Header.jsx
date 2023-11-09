import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import './Styles/header.css'
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
            <header className="header">
                <div className="logo">
                    Salão Lima
                </div>
                {/* <div className="hamburger">Menu</div> */}
                <nav className="navbar">
                    <Link to='/' className="link">Agendamento</Link>
                    {isAdmin &&
                        <Link to='/controle' className="link">Horários</Link>
                    }
                    {authUser &&
                        <Link to='/my-profile' className="link">Meu Perfil</Link>
                    }
                    {authUser ?
                        <Link onClick={handleClick}>Sair</Link>
                        :
                        <Link to='/login' className="link">Login</Link>
                    }
                </nav>
            </header>
        </>
    )
}