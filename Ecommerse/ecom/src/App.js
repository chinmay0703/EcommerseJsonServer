import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './routes/Home';
import Products from './routes/Products';
import Cart from './routes/Cart';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Admin from './routes/Admin';

function App() {

  const authToken = localStorage.getItem('authToken');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Outlet />}>
          <Route
            index
            element={
              authToken ? (
                <Cart />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Route>
        <Route path="/login" element={<Login />} />
       
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        draggable
      />
    </Router>
  );
}

export default App;
