// App.js

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CakeDetails from './components/Cakes/CakeDetails';
import { AuthProvider } from './contexts/authContext';
import AdminPanel from './components/Admin/AdminPanel'; // Импортируем AdminPanel
import { useStateContext } from './context/StateContextProvider';
import About from './components/About/About';
import Orders from './components/Orders/Orders';
import { useEffect } from 'react';
import Success from './pages/Success';
import Cancel from './pages/Cancel';

function App() {
  const { showCart } = useStateContext();
  useEffect(() => {
    document.querySelector("body").style.overflow = showCart ? "hidden" : "visible";
  }, [showCart]);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        { showCart && <Orders />}
        <Routes>
          <Route path='/' element={<LandingPage />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/cakes/:slug' element={<CakeDetails />}></Route>
          <Route path='/admin' element={<AdminPanel />}></Route>
          <Route path='/success' element={<Success />}></Route>
          <Route path='/cancel' element={<Cancel />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
