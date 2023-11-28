// React
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';

// Firebase
import { onAuthStateChanged } from 'firebase/auth';

// Routes
import Control from './pages/Control/Control';
import Home from './pages/Home/Home';
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './pages/Login/Login';
import MyProfile from './pages/MyProfile/MyProfile';
import Signup from './pages/Signup/Signup';
import NotFound from './pages/NotFound/NotFound';

// Hooks
import { useAuthentication } from './hooks/useAuthentication';

// Context
import { AuthContextProvider } from './context/AuthContext';

function App() {

  const [user, setUser] = useState(undefined);
  const [showMenu, setShowMenu] = useState(false);
  const {auth} = useAuthentication()

  const loadingUser = user === undefined;

  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      setUser(user);
    })

  }, [auth])

  if (loadingUser) {
    return <p>Loading...</p>
  }

  return (
    <div className="App">
      <AuthContextProvider value={{user}}>
        <BrowserRouter>
          <Header showMenu={showMenu} setShowMenu={setShowMenu} />
          {/* Rotas do App */}
          <div className="container" onClick={() => setShowMenu(false)}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/controle' element={<Control />} />
            <Route path='/login' element={!user ? <Login /> : <Navigate to='/profile'/>} />
            <Route path='/profile' element={user ? <MyProfile /> : <Navigate to='/'/>} />
            <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/profile'/>} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;

// New pull request