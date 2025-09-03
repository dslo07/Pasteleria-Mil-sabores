import { BrowserRouter, Routes,Route } from 'react-router-dom'
import NavBar from '../components/UserCompo/NavBar'
import Footer from '../components/UserCompo/Footer'
import Header from '../components/UserCompo/Header'
import ProductosMain from '../components/UserCompo/ProductosMain'
import Slider from '../components/UserCompo/Slider'

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