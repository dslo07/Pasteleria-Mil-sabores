import React from "react";
import CompoContent from "../../components/AdminCompo/CompoContent";
import ArticuloCard from "../../components/AdminCompo/ArticuloCard";
import BlogCardSKL from "../../components/skeletons/BlogCardSKL";  // Importar el Skeleton
import useFetch from "../../hooks/useFetch";

const AdminBlog = () => {
  const url = `${import.meta.env.VITE_PAGINA_ADMIN_BLOG}`;

  const { data: blogs, loading } = useFetch(url);  // Puedes usar la variable loading si tu hook `useFetch` la devuelve.

  return (
    <div>
      <CompoContent tipo={"Blog"}>
        <div className="row">
          {loading ? (
            // Mostrar Skeletons si los datos están cargando
            Array(6) // Mostrar 6 skeletons (ajusta el número según sea necesario)
              .fill()
              .map((_, index) => (
                <div className="col-md-6 mb-4" key={index}>
                  <BlogCardSKL />
                </div>
              ))
          ) : (
            // Mostrar blogs reales cuando ya están cargados
            blogs && blogs.map((blog) => (
              <div className="col-md-6 mb-4" key={blog.id_blogs}>
                <ArticuloCard blog={blog} />
              </div>
            ))
          )}
        </div>
      </CompoContent>
    </div>
  );
};

export default AdminBlog;
