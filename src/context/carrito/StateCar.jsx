import { useEffect, useState } from 'react';
import { carContext } from './carContext';
import useFetch from '../../hooks/useFetch';
import toast from 'react-hot-toast';

const StateCar = ({ children }) => {
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
  const listaCupones = useFetch('./ApiCupones');

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
      toast.error("El producto ya está en el carrito.");
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
    const cuponValido = listaCupones.find((c) => c.codigo === c.codigo);
    if (cuponValido) {
      setCupon(cuponValido);
      toast.success('Cupón aplicado!');
    } else {
      toast.error('Cupón inválido');
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
      }}
    >
      {children}
    </carContext.Provider>
  );
};

export default StateCar;
