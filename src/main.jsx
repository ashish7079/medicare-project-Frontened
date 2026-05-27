window.global = window;

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'leaflet/dist/leaflet.css';

import CartProvider from './Context/CartContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>

    <CartProvider>

      <App />

    </CartProvider>

  </React.StrictMode>,
)