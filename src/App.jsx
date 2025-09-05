import { BrowserRouter, Routes,Route, Router } from 'react-router-dom'
//Rutas para el uso Usuario
import Principal from './pages/Principal'
import Register from './pages/Register'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Tienda from './pages/Tienda'
import Carrito from './pages/Carrito'
import Blog from './pages/Blog'
import Contacto from './pages/Contacto'
import Nosotros from './pages/Nosotros'
//Rutas para el admin
import DashBoard from './pages/Admin/DashBoard'
import AdminProd from './pages/Admin/AdminProd'
import AdminUsers from './pages/Admin/AdminUsers'
import AdminOrders from './pages/Admin/AdminOrders'

function App() {
  return (
    <>

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
        {/*rutas del Admin*/}
        <Route path='/admin' element={<DashBoard/>}>
          <Route path='productos' element={<AdminProd/>}/>
          <Route path='usuarios'   element={<AdminUsers/>}/>
          <Route path='ordenes'   element={<AdminOrders/>}/>
        </Route>
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
