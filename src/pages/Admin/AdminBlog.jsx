import React from "react";
import CompoContent from "../../components/AdminCompo/CompoContent";
import useFetch from "../../hooks/useFetch";
import ArticuloCard from "../../components/UserCompo/ArticuloCard";
const AdminBlog = () => {
  const { data: blogs } = useFetch("http://localhost:5174/api/blogs");

  return (
    <div>
      <CompoContent tipo={"Blog"}>
        <div className="row">
          {blogs && blogs.map((blog, index) => (
            <div className="col-md-6 mb-4" key={index}>
              <ArticuloCard
                titulo={blog.titulo_blogs}
                descripcion={blog.descripcion_blogs}
                fecha={blog.fecha_blogs}
                img={blog.imagen}
                id={blog.id_blogs}
              />
            </div>
          ))}
        </div>
      </CompoContent>
    </div>
  );
};

export default AdminBlog;
