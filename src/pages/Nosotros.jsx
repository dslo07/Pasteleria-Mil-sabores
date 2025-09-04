import { useContext } from 'react'
import InfoEmpresa from '../components/UserCompo/InfoEmpresa'
import NavBar from '../components/UserCompo/NavBar'
import Slider from '../components/UserCompo/Slider'
import Footer from '../components/UserCompo/Footer'
function Nosotros() {
  return (
    <>
      <NavBar/>
      <div className='separador'></div>
      <InfoEmpresa/>
      <Slider/>
      <Footer/>
    </>
  )
}

export default Nosotros
