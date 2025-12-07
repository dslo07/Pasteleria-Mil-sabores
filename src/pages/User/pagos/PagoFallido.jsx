import { useNavigate } from 'react-router-dom'

function PagoFallido() {
  const navigate = useNavigate()
  return (
    <>
      <div className=' py-5 d-flex justify-content-center align-items-center '>
        <div>
          <div className='d-flex justify-content-center'> 
          </div>
          <div className=''>
              <h1>Su pago fue rechazado, por favor intentelo de nuevo.</h1>
              <div className='d-flex justify-content-center'>
                <iframe src="https://lottie.host/embed/e919fa51-46a9-4be3-84e2-05308bb3ae25/E5uz5SDzSm.lottie" style={{ height: '400px' }}> </iframe>
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

export default PagoFallido