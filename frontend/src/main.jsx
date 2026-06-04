import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
     <CartProvider>
      <App />
    </CartProvider>
  </BrowserRouter>

)
