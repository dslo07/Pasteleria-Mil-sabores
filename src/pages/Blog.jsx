import { useContext } from 'react'
import NavBar from '../components/UserCompo/NavBar'
import ArticuloCard from '../components/UserCompo/ArticuloCard'
import Footer from '../components/UserCompo/Footer'
function Blog() {
  return (
    <>
      <NavBar/>
      <div className='separador'></div>
      <div className='container'>
        <div>
          <h1 >Conoce nuestras ultimas noticias...</h1>
        </div>
        {/*aqui va el map del blog*/}
          <div className='row d-flex justify-content-center py-4'>
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
