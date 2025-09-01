import { BrowserRouter, Routes,Route } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ProductosMain from '../components/ProductosMain'
import Slider from '../components/Slider'

const Main = () => {

  return (
    <>
      <NavBar/>
      <Header/>
      <ProductosMain/>
      <Slider/>
      <Footer/>
    </>
  )
}

export default Main