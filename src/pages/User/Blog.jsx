import ArticuloCliente from '../../components/UserCompo/ArticuloCliente'
import useFetch from "../../hooks/useFetch";

function Blog() {
  const { data: blogs } = useFetch("http://localhost:5174/api/blogs");
  
  return (
    <>
      <header className="bg-blog px-5" style={{ height: '50vh' }}>
        <div className='d-flex justify-content-center align-items-center h-100'>
            <h1 className='text-white display-1'>Blog mil sabores</h1>
        </div>
      </header>

      <div className='container'>
        <div className='text-center py-5'>
          <h2>Conoce nuestras últimas noticias...</h2>
        </div>

        <div className='row d-flex justify-content-center pb-4'>
          {blogs ? (
            blogs.map((blog, index) => (
              <div className='col-md-6 col-lg-4 mb-4' key={index}>
                <ArticuloCliente blog={blog}/>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>

    </>
  )
}

export default Blog
