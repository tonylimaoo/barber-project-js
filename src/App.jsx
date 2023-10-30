import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import Control from './pages/Control';
import Home from './pages/Home';
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/controle' element={<Control />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
