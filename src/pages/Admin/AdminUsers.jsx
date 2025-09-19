import React from "react";
import useFetch from "../../hooks/useFetch";
import CardUserTabla from "../../components/AdminCompo/CardUserTabla";
import CompoContent from "../../components/AdminCompo/CompoContent";

const AdminUsers = () => { 
  const { data: usuarios } = useFetch("/ApiUsuarios.json");
  
  return (
    <CompoContent tipo="Usuario" contenido={usuarios}>
        {usuarios?.map((usuario, index) => (
          <CardUserTabla key={index} usuario={usuario} />
        ))}
      </CompoContent>
  );
}

export default AdminUsers;
