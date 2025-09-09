import  { useEffect, useState } from 'react'
import { carContext } from './carContext';
import useFetch from '../../hooks/useFetch';
import toast from 'react-hot-toast';
const StateCar = ({ children }) => {
    const [carrito, setCarrito] = useState([]);
  const [productos,setProductos] = useState([])
  const [total,setTotal] = useState(0)
  const [costo,setCosto] = useState(0)
  const [cupon,setCupon] = useState({
    codigo:"",
    descuento:0
  })
  // traer cupones 
  const listaCupones = useFetch("./ApiCupones");
  useEffect(()=>{
    let suma = productos.reduce((acc, prod) => acc + prod.precio, 0)

    // aplicar descuento solo si existe cupón válido
    if (cupon?.descuento > 0) {
      suma -= cupon.descuento
    }

    setCosto(suma)
    setTotal(productos.length)
  },[ productos, cupon ]);

  const agregarProd = (prod) => {

    if(!prod.inCar){
      prod.inCar = true;
      prod.cantInCar += 1 ;
      setProductos([...productos,prod])
    }else{
      toast.error("El producto ya esta en el carrito.")
    }
  }
  const controlCantidad = (accion, producto) => {
    setCarrito(prev => prev.map(item => {
      if (item.id === producto.id) {
        if (accion === "suma") return { ...item, cantInCar: item.cantInCar + 1 };
        if (accion === "resta") return { ...item, cantInCar: Math.max(0, item.cantInCar - 1) };
      }
      return item;
    }));
  };
  const quitarProducto = (id) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
  };
  const aplicarCupon = () => {
    
  }
  return (
    <carContext.Provider value={{productos,total,costo,cupon,setCupon, agregarProd, aplicarCupon,controlCantidad,quitarProducto}}>
      {children}
    </carContext.Provider>
  )
}

export default StateCar