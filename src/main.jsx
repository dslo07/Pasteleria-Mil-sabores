import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import StateCar from './context/carrito/StateCar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StateCar>
      <App />
    </StateCar>
  </StrictMode>
)
