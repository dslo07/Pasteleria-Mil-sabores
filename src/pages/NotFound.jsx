import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/UserCompo/NavBar'
function NotFound() {
  const navigate = useNavigate()
  return (
    <>
    <NavBar/>
      <div className='vw-100 vh-100 d-flex justify-content-center align-items-center '>
        <div>
          <div className='d-flex justify-content-center'> 
              <iframe src="https://lottie.host/embed/ac307980-7a37-4884-ac05-600701eb68c6/kO12Bljxyd.lottie" style={{ height: '400px' }}></iframe>
          </div>
          <div className=''>
            <h1>No hemos podidodo encontrar la pagina que buscas</h1>
            <div className='d-flex justify-content-center'>
              <button className='btn-general border-0' onClick={() => navigate('/')}>
                Volver a inicio
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFound