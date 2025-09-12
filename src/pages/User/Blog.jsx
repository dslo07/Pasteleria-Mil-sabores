import { useContext } from 'react'
import NavBar from '../../components/UserCompo/NavBar'
import ArticuloCard from '../../components/UserCompo/ArticuloCard'
import Footer from '../../components/UserCompo/Footer'
import logo from  '../../img/logo-sin-fondo.png'

function Blog() {
  return (
    <>
      <NavBar/>
      <header class="bg-blog px-5 ">
        <div className='d-flex justify-content-center align-items-center h-100' >
            <h1 className='text-white display-1'>Blog mil sabores</h1>
        </div>
      </header>
      <div className='container'>
        <div>
          <div className='text-center py-5'>
            <h2>Conoce nuestras ultimas noticias...</h2>
          </div>
        </div>
        {/*aqui va el map del blog*/}
          <div className='row d-flex justify-content-center pb-4'>
            <div className='col-6'>
              <ArticuloCard/>
            </div>
            <div className='col-6'>
              <ArticuloCard/>
            </div>
            <div className='col-6'>
              <ArticuloCard/>
            </div>
            <div className='col-6'>
              <ArticuloCard/>
            </div>
          </div>
      </div>
      <Footer/>
    </>
  )
}

export default Blog
