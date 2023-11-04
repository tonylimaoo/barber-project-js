import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import Control from './pages/Control';
import Home from './pages/Home';
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './pages/Login';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
import { useAuth } from './hooks/useAuth';
import MyProfile from './pages/MyProfile';
import Teste from './pages/Teste';


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
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/controle' element={<Control />} />
            <Route path='/login' element={<Login />} />
            <Route path='/my-profile' element={<MyProfile />} />
            <Route path='/teste' element={<Teste />} />
          </Routes>
          <div>
            {authUser ?
              <>
                <p>Signed In as {authUser.email}</p>
                <button onClick={userSignOut}>Sign Out</button>
              </>
              : <p>Signed Out</p>
            }
          </div>
        </main>
        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;

// New pull request
