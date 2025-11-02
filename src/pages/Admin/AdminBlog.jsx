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
          {blogs && blogs.map((blog) => (
            <div className="col-md-6 mb-4" key={blog.id_blogs}>
              <ArticuloCard
                articulo={blog} // Pasamos todo el objeto blog
              />
            </div>
          ))}
        </div>
      </CompoContent>
    </div>
  );
};

export default AdminBlog;
