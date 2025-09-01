import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Principal from './pages/Principal'
import Register from './pages/Register'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Principal/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/registro' element={<Register/>}/>
        <Route path='*' element={<NotFound/>}/>
       </Routes>
    </BrowserRouter>
  )
}

export default App
