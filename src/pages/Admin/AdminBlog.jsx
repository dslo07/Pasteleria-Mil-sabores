import React from "react";
import CompoContent from "../../components/AdminCompo/CompoContent";
import ArticuloCard from "../../components/AdminCompo/ArticuloCard";
import useFetch from "../../hooks/useFetch";

const AdminBlog = () => {
  const { data: blogs } = useFetch("http://localhost:5174/api/blogs");

  return (
    <div>
      <CompoContent tipo={"Blog"}>
        <div className="row">
          {blogs && blogs.map((blog) => (
            <div className="col-md-6 mb-4" key={blog.id_blogs}>
              <ArticuloCard
                blog={blog} // Pasamos todo el objeto blog
              />
            </div>
          ))}
        </div>
      </CompoContent>
    </div>
  );
};

export default AdminBlog;
