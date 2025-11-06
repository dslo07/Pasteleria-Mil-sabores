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
import VistaBlog from './pages/User/VistaBlog'
//Rutas para el admin
import DashBoard from './pages/Admin/DashBoard'
import AdminProd from './pages/Admin/AdminProd'
import AdminUsers from './pages/Admin/AdminUsers'
import AdminCat from './pages/Admin/AdminCat'
import AdminBlog from './pages/Admin/AdminBlog'
import AdminStats from './pages/Admin/AdminStats'
//crud de admin
import CrearProd from './pages/Admin/CRUD/create/CrearProd'
import CrearUser from './pages/Admin/CRUD/create/CrearUser'
import CrearArticulo from './pages/Admin/CRUD/create/CrearArticulo'
import CrearCategoria from './pages/Admin/CRUD/create/CrearCategoria'
import EditarProd from './pages/Admin/CRUD/update/EditarProd'
import EditarCat from './pages/Admin/CRUD/update/EditarCat'
import EditarUser from './pages/Admin/CRUD/update/EditarUser'
import EditarArticulo from './pages/Admin/CRUD/update/EditarArticulo'
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
          <Route path='/blog/:id' element={<VistaBlog/>}/>
          <Route path='/nosotros' element={<Nosotros/>}/>
          <Route path='/tienda' element={<Tienda/>}/>
          <Route path='/producto/:id' element={<VistaProducto/>}/>
          <Route path='/my-car' element={<Carrito/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Route>
        {/*rutas del Admin*/}
        <Route path='/admin' element={<DashBoard/>}>
          <Route index element={<AdminStats/>}/>
          {/*editar Perfil*/}
          <Route path='admin-perfil' element={<PerfilUsuario/>}/>
          {/*Crud Categorias*/}
          <Route path='categorias' element={<AdminCat/>}/>
          <Route path='categorias/editar-categoria/:id' element={<EditarCat/>}/>
          <Route path='categorias/crear-categoria' element={<CrearCategoria/>}/>
          {/*Crud Productos*/}
          <Route path='productos' element={<AdminProd/>}/>
          <Route path='productos/crear-producto' element={<CrearProd/>}/>
          <Route path="productos/editar-producto/:codigo_producto" element={<EditarProd />} />
          {/*Crud Usuarios*/}
          <Route path='usuarios'   element={<AdminUsers/>}/>
          <Route path='usuarios/crear-usuario' element={<CrearUser/>}/>
          <Route path='usuarios/editar-usuario/:id' element={<EditarUser/>}/>
          {/*Crud Blogs*/}
          <Route path='blog'   element={<AdminBlog  />}/>
          <Route path='blog/crear-blog' element={<CrearArticulo/>}/>
          <Route path='blog/editar-blog/:id' element={<EditarArticulo/>}/>
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
