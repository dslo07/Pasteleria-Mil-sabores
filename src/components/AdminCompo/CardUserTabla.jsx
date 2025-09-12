import React from "react";
import { FaUsers } from "react-icons/fa6";
import { GrConfigure } from "react-icons/gr";

const CardUserTabla = () => {
  return(
    <div>
      <div>
        <FaUsers/>
        <div>
          <h1>Santiago Lopez</h1>
          <p>santiago@gmail.com</p>
        </div>
        <div> 
          <span>rol: user </span>
          <span>estado: activo</span>
          <GrConfigure/>
        </div>
      </div>
    </div>
  )
}
export default CardUserTabla