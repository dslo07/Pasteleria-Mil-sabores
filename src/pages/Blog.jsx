import { useContext } from 'react'
import NavBar from '../components/UserCompo/NavBar'
import ArticuloCard from '../components/UserCompo/ArticuloCard'
function Blog() {
  return (
    <>
      <NavBar/>
      <div className='separador'></div>
      <div className='container'>
        <div>
          <h1 >Conoce nuestras ultimas noticias...</h1>
        </div>
        <div className='row d-flex justify-content-center'>
          <div className='col'>
            <ArticuloCard/>
          </div>
          <div className='col'>
            <ArticuloCard/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Blog
