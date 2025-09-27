import { useContext, useEffect, useState } from 'react';
import { carContext } from './carContext';
import { userContext } from '../../context/user/userContext';
import useFetch from '../../hooks/useFetch';
import toast from 'react-hot-toast';

const StateCar = ({ children }) => {
  const {isLogin} = useContext(userContext)
  // cargar desde localStorage al inicio
  const [productos, setProductos] = useState(() => {
    const stored = localStorage.getItem('carrito');
    return stored ? JSON.parse(stored) : [];
  });

  const [total, setTotal] = useState(0);
  const [costo, setCosto] = useState(0);
  const [cupon, setCupon] = useState({
    codigo: '',
    descuento: 0,
  });

  // traer cupones
  const { data: listaCupones} = useFetch('/ApiCupones.json');
   
  // recalcular totales
  useEffect(() => {
    let suma = productos.reduce(
      (acc, prod) => acc + prod.precio * prod.cantInCar,
      0
    );

    if (cupon?.descuento > 0) {
      suma -= cupon.descuento;
    }

    setCosto(suma);
    setTotal(productos.reduce((acc, p) => acc + p.cantInCar, 0));
  }, [productos, cupon]);

  // guardar en localStorage cuando cambie productos
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(productos));
  }, [productos]);

  const agregarProd = (prod) => {
    const existe = productos.find((p) => p.codigo === prod.codigo);

    if (!existe) {
      const newProd = { ...prod, inCar: true, cantInCar: 1 };
      setProductos([...productos, newProd]);
    } else {
  //    toast.error("El producto ya está en el carrito.");
    }
  };


  const controlCantidad = (accion, producto) => {
    setProductos((prev) =>
      prev.map((item) => {
        if (item.codigo === producto.codigo) {
          if (accion === 'suma') {
            return { ...item, cantInCar: item.cantInCar + 1 };
          }
          if (accion === 'resta') {
            return { ...item, cantInCar: Math.max(1, item.cantInCar - 1) };
          }
        }
        return item;
      })
    );
  };

  const quitarProducto = (codigo) => {
    setProductos((prev) => prev.filter((item) => item.codigo !== codigo));
  };

  const aplicarCupon = (codigo) => {
    const cuponValido = listaCupones?.find((c) => c.codigo === codigo);

      //vacio por el momento
  };


//==== queda pendiente validar que si no hay productos agregados no se puede comprar
const comprar = () => {
  if (isLogin) {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1200)),
      {
        loading: 'Procesando compra...',
        success: 'Compra realizada con éxito!',
        error: 'Error en la compra'
      }
    ).then(() => {
      setProductos([]); 
      setCupon({ codigo: '', descuento: 0 });  
    });
  } else {
    toast.error("Para comprar debe estar logeado");
  }
};


  return (
    <carContext.Provider
      value={{
        productos,
        total,
        costo,
        cupon,
        setCupon,
        agregarProd,
        aplicarCupon,
        controlCantidad,
        quitarProducto,
        comprar
      }}
    >
      {children}
    </carContext.Provider>
  );
};

export default StateCar;
