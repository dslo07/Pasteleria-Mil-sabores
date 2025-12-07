import { useNavigate } from 'react-router-dom'

function PagoExitoso() {
  const navigate = useNavigate()
  return (
    <>
      <div className=' py-5 d-flex justify-content-center align-items-center '>
        <div>
          <div className='d-flex justify-content-center'> 
          </div>
          <div className=''>
              <h1>Su compra se ha procesado con exito</h1>
              <div className='d-flex justify-content-center'>
                <iframe src="https://lottie.host/embed/e8328371-2cde-4797-bd1d-8e0b9a72c37f/w6YpYb9ypy.lottie" style={{ height: '400px' }}></iframe>
              </div>
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

export default PagoExitoso