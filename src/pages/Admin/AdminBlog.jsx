import React from "react";
import CompoContent from "../../components/AdminCompo/CompoContent";
import useFetch from "../../hooks/useFetch";
import ArticuloCard from "../../components/UserCompo/ArticuloCard";
const AdminBlog = () => {
  const { data: blogs } = useFetch("/ApiBlogs.json");

  return (
    <div>
      <CompoContent tipo={"Blog"}>
        <div className="row">
          {blogs && blogs.map((blog, index) => (
            <div className="col-md-6 mb-4" key={index}>
              <ArticuloCard
                titulo={blog.titulo}
                descripcion={blog.descripcion}
                fecha={blog.fecha}
                img={blog.img}
              />
            </div>
          ))}
        </div>
      </CompoContent>
    </div>
  );
};

export default AdminBlog;
