// React
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import { useContext } from 'react';

// Context
import { AdminContext } from './context/ AdminContext';

// Firebase
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
import { useAuth } from './hooks/useAuth';

// Routes
import Control from './pages/Control';
import Home from './pages/Home';
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './pages/Login';
import MyProfile from './pages/MyProfile';
import TesteAdminContext from './pages/TesteAdminContext';

function App() {

  const { authUser } = useAuth();

  const userSignOut = () => {
    signOut(auth).then(() => {
      console.log("signOut succesfully");
    }).catch(error => console.log(error))
  }


  return (
    <div className="App">
      <BrowserRouter>
        <Header userSignOut={userSignOut} authUser={authUser} />
        <main>
          {/* Rotas do App */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/controle' element={<Control />} />
            <Route path='/login' element={<Login />} />
            <Route path='/my-profile' element={<MyProfile />} />
            <Route path='/teste' element={<TesteAdminContext />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

// New pull request