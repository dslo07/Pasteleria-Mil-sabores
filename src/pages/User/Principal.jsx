import { BrowserRouter, Routes,Route } from 'react-router-dom'
import NavBar from '../../components/UserCompo/NavBar'
import Footer from '../../components/UserCompo/Footer'
import Header from '../../components/UserCompo/Header'
import ProductosMain from '../../components/UserCompo/ProductosMain'
import Slider from '../../components/UserCompo/Slider'

const Main = () => {
  let ttlMain  = "Buscamos ofrecer una experiencia de compra moderna."
  let descMain = "Te ofrecemos una experiencia dulce y memorable,proporcionando tortas y productos de repostería de alta calidad para todas las ocasiones."
  let rediMain = "/contacto"
  let ctaMain = "Contactanos"
  return (
    <>
      <Header titulo ={ttlMain} desc={descMain} redi={rediMain} cta={ctaMain}/>
      <ProductosMain/>
      <Slider/>
    </>
  )
}

export default Main