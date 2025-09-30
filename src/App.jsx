import { BrowserRouter, Routes,Route, Router } from 'react-router-dom'
//Rutas para el uso Usuario
import Layout from './pages/User/Layout'
import Principal from './pages/User/Principal'
import Register from './pages/User/Register'
import Login from './pages/User/Login'
import NotFound from './pages/User/NotFound'
import Tienda from './pages/User/Tienda'
import Carrito from './pages/User/Carrito'
import Blog from './pages/User/Blog'
import PerfilUsuario from './pages/User/PerfilUsuario'
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
import CrearProd from './pages/Admin/crud/create/CrearProd'
import CrearUser from './pages/Admin/crud/create/CrearUser'
import CrearArticulo from './pages/Admin/crud/create/CrearArticulo'
import EditarProd from './pages/Admin/crud/update/EditarProd'
import EditarUser from './pages/Admin/crud/update/EditarUser'

// Toast (alert)
import toast, { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>

    <BrowserRouter>
      <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/registro' element={<Register/>}/>
        {/*rutas del usuario*/}
        <Route path='/' element={<Layout/>}>
          <Route index element={<Principal/>}/>
          <Route path='/mi-perfil' element={<PerfilUsuario/>}/>
          <Route path='/contacto' element={<Contacto/>}/>
          <Route path='/blog' element={<Blog/>}/>
          <Route path='/nosotros' element={<Nosotros/>}/>
          <Route path='/tienda' element={<Tienda/>}/>
          <Route path='/producto/:id' element={<VistaProducto/>}/>
          <Route path='/my-car' element={<Carrito/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Route>
        {/*rutas del Admin*/}
        <Route path='/admin' element={<DashBoard/>}>
          <Route index element={<AdminStats/>}/>
          <Route path='admin-perfil' element={<PerfilUsuario/>}/>
          <Route path='productos' element={<AdminProd/>}/>
          <Route path='productos/crear-producto' element={<CrearProd/>}/>
          <Route path="productos/editar-producto/:id" element={<EditarProd />} />
          <Route path='usuarios'   element={<AdminUsers/>}/>
          <Route path='usuarios/crear-usuario' element={<CrearUser/>}/>
          <Route path='usuarios/editar-usuario/:id' element={<EditarUser/>}/>
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
