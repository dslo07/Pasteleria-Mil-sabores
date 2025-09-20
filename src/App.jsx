import { BrowserRouter, Routes,Route, Router } from 'react-router-dom'
//Rutas para el uso Usuario
import Principal from './pages/User/Principal'
import Register from './pages/User/Register'
import Login from './pages/User/Login'
import NotFound from './pages/User/NotFound'
import Tienda from './pages/User/Tienda'
import Carrito from './pages/User/Carrito'
import Blog from './pages/User/Blog'
import Contacto from './pages/User/Contacto'
import Nosotros from './pages/User/Nosotros'
import VistaProducto from './components/UserCompo/VistaProducto'
//Rutas para el admin
import DashBoard from './pages/Admin/DashBoard'
import AdminProd from './pages/Admin/AdminProd'
import AdminUsers from './pages/Admin/AdminUsers'
import AdminBlog from './pages/Admin/AdminBlog'
import AdminStats from './pages/Admin/AdminStats'
//crud de admin
import CrearProd from './pages/Admin/CRUD/CrearProd'
import CrearUser from './pages/Admin/CRUD/CrearUser'
import CrearArticulo from './pages/Admin/CRUD/CrearArticulo'

// Toast (alert)
import toast, { Toaster } from 'react-hot-toast';
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
        <Route path='/producto/:id' element={<VistaProducto/>}/>
        <Route path='/my-car' element={<Carrito/>}/>
        <Route path='*' element={<NotFound/>}/>
        {/*rutas del Admin*/}
        <Route path='/admin' element={<DashBoard/>}>
          <Route index element={<AdminStats/>}/>
          <Route path='productos' element={<AdminProd/>}/>
          <Route path='productos/crear-producto' element={<CrearProd/>}/>
          <Route path='usuarios'   element={<AdminUsers/>}/>
          <Route path='usuarios/crear-usuario' element={<CrearUser/>}/>
          <Route path='blog'   element={<AdminBlog  />}/>
          <Route path='blog/crear-blog' element={<CrearArticulo/>}/>
        </Route>
      </Routes>
    </BrowserRouter>


    <Toaster 
      position="top-center" 
      reverseOrder={false}
      //configuracion
      toastOptions={{
        duration: 1200,
        removeDelay: 500,
        style: {
          background: '#8B4513',
          color: '#fff',
        }
      }}/>
    </>
  )
}

export default App
