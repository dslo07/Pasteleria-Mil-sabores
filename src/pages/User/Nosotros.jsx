import { useContext } from 'react'
import InfoEmpresa from '../../components/UserCompo/InfoEmpresa'
import Header from '../../components/UserCompo/Header'
import Slider from '../../components/UserCompo/Slider'
function Nosotros() {
  return (
    <>
      <Header titulo={"Nuestra Pasteleria"}  desc="Conoce la historia detra de los pasteles favoritos de todo santiago" redi="/tienda" cta="ir a tienda" />
      <InfoEmpresa/>
    </>
  )
}

export default Nosotros
