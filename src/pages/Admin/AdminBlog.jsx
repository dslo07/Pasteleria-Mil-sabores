import React from "react";
import CompoContent from "../../components/AdminCompo/CompoContent";
import ArticuloCard from "../../components/AdminCompo/ArticuloCard";
import useFetch from "../../hooks/useFetch";

const AdminBlog = () => {
  const url = `${import.meta.env.VITE_PAGINA_ADMIN_BLOG}`;

  const { data: blogs } = useFetch(url);

  return (
    <div>
      <CompoContent tipo={"Blog"}>
        <div className="row">
          {blogs && blogs.map((blog) => (
            <div className="col-md-6 mb-4" key={blog.id_blogs}>
              <ArticuloCard
                blog={blog}
              />
            </div>
          ))}
        </div>
      </CompoContent>
    </div>
  );
};

export default AdminBlog;
