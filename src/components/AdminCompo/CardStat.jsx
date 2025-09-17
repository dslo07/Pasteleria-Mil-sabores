import React from "react";

const CardStats = ({ titulo, img, stats, desc }) => {
  return(
    <>
      <div className="p-3 col-3 border rounded">
          <div className="d-flex justify-content-between">
            <span className="fw-semibold ">{titulo}</span>
            <img src={img} alt="icono"/>
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

              // <Card>
              //   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              //     <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
              //     <Package className="h-4 w-4 text-muted-foreground" />
              //   </CardHeader>
              //   <CardContent>
              //     {statsLoading ? (
              //       <Loader2 className="h-6 w-6 animate-spin" />
              //     ) : (
              //       <>
              //         <div className="text-2xl font-bold">{stats.totalProducts}</div>
              //         <p className="text-xs text-muted-foreground">Productos en catálogo</p>
              //       </>
              //     )}
              //   </CardContent>
              // </Card>