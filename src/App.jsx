import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Principal from './pages/Principal'
import Register from './pages/Register'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Tienda from './pages/Tienda'
import Carrito from './pages/Carrito'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Principal/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/registro' element={<Register/>}/>
        <Route path='/tienda' element={<Tienda/>}/>
        <Route path='/my-car' element={<Carrito/>}/>
        <Route path='*' element={<NotFound/>}/>
       </Routes>
    </BrowserRouter>
  )
}

export default App
