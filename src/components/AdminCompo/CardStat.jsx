import React from "react";

const CardStats = ({ titulo, img, stats, desc }) => {
  return(
    <>
      <div className="p-3 col-5 border rounded card-hover">
          <div className="d-flex justify-content-between">
            <span className="fw-semibold ">{titulo}</span>
            {img} 
          </div>
          <div>
            <h2 className="display-5">{stats}</h2>
            <p className="m-0 text-muted">{desc}</p>
          </div>
      </div>
    </>
  )
}
export default CardStats