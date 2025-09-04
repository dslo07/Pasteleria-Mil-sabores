import { BrowserRouter, Routes,Route, Router } from 'react-router-dom'
import Principal from './pages/Principal'
import Register from './pages/Register'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Tienda from './pages/Tienda'
import Carrito from './pages/Carrito'
import Blog from './pages/Blog'
import Contacto from './pages/Contacto'
import Nosotros from './pages/Nosotros'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*rutas del usuario*/}
        <Route path='/' element={<Principal/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/registro' element={<Register/>}/>
        <Route path='/contacto' element={<Contacto/>}/>
        <Route path='/blog' element={<Blog/>}/>
        <Route path='/nosotros' element={<Nosotros/>}/>
        <Route path='/tienda' element={<Tienda/>}/>
        <Route path='/my-car' element={<Carrito/>}/>
        <Route path='*' element={<NotFound/>}/>

        {/*rutas admin*/}
        <Route path='/admin' element={<NotFound/>}>
          <Route path='productos'/>
        </Route>
      </Routes>

    </BrowserRouter>
  )
}

export default App
