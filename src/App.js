// React
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';

// Firebase
import { onAuthStateChanged } from 'firebase/auth';

// Routes
import Control from './pages/Control/Control';
import Home from './pages/Home/Home';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Login from './pages/Login/Login';
import MyProfile from './pages/MyProfile/MyProfile';
import Signup from './pages/Signup/Signup';
import NotFound from './pages/NotFound/NotFound';

// Hooks
import { useAuthentication } from './hooks/useAuthentication';

// Context
import { AuthContextProvider } from './context/AuthContext';
import { useAdmin } from './hooks/useAdmin';
import { AdminContextProvider } from './context/AdminContext';

// Assets
import logo from './assets/salão_lima_logo-removebg.png'

function App() {

  const [user, setUser] = useState(undefined);
  const [showMenu, setShowMenu] = useState(false);
  const { auth } = useAuthentication();
  // const { isAdmin } = useAdmin(user);

  const loadingUser = user === undefined;

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      setUser(user);
    })

  }, [auth])

  // useEffect(() => {
  //   console.log(isAdmin) 
  // }, [isAdmin])

  if (loadingUser) {
    return <p>Loading...</p>
  }

  return (
    <div className="App">
      <AuthContextProvider value={{ user }}>
        <AdminContextProvider>
          <BrowserRouter>
            <Header showMenu={showMenu} setShowMenu={setShowMenu} />
            {/* Rotas do App */}
            <div className="container" onClick={() => setShowMenu(false)}>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/controle' element={user ? <Control /> : <Navigate to='/' />} />
                <Route path='/login' element={!user ? <Login /> : <Navigate to='/profile' />} />
                <Route path='/profile' element={user ? <MyProfile /> : <Navigate to='/' />} />
                <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/profile' />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
              {/* <img src={logo} className='logo-bg'/> */}
            </div>
            <Footer />
          </BrowserRouter>
        </AdminContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;

// New pull request