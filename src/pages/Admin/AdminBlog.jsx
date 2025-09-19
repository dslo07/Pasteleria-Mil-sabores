import React from "react";
import CompoContent from "../../components/AdminCompo/CompoContent";
import useFetch from "../../hooks/useFetch";

const AdminBlog = () => {
    const { data: usuarios } = useFetch("/ApiUsuarios.json");

  return(
    <div>
      <CompoContent tipo={"Blog"}  contenido={[]}/>
    </div>
  )
}
export default AdminBlog