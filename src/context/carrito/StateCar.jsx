import { useState, useEffect } from 'react';
import { carContext } from './carContext';
import toast from 'react-hot-toast';

const API_URL = "http://localhost:5174/api/productos";

const StateCar = ({ children }) => {
  const [ids, setIds] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cupon, setCupon] = useState({ codigo: null, descuento: 0 });
  const [loading, setLoading] = useState(false);

  // Cargar IDs desde localStorage
  useEffect(() => {
    const data = localStorage.getItem("carrito_ids");
    if (data) setIds(JSON.parse(data));
  }, []);

  // Guardar IDs en localStorage
  useEffect(() => {
    localStorage.setItem("carrito_ids", JSON.stringify(ids));
  }, [ids]);

  // Inicializar productos según los IDs existentes al cargar
  useEffect(() => {
    if (ids.length === 0) return;
    setLoading(true);
    fetch(`${API_URL}?ids=${ids.join(",")}`)
      .then(res => res.json())
      .then(data => {
        const productosArray = Array.isArray(data) ? data : [data];
        const productosConCant = productosArray.map(p => ({ ...p, cantInCar: 1 }));
        setProductos(productosConCant);
      })
      .catch(() => toast.error("Error al cargar productos"))
      .finally(() => setLoading(false));
  }, []);

  // Agregar producto por ID
  const agregarProd = (id) => {
    if (ids.includes(id)) {
      toast.error("El producto ya está en el carrito");
      return;
    }

    setLoading(true);
    fetch(`${API_URL}?ids=${id}`) // Traer solo el producto agregado
      .then(res => res.json())
      .then(data => {
        const productoNuevo = Array.isArray(data) ? data[0] : data;
        productoNuevo.cantInCar = 1;
        setProductos(prev => [...prev, productoNuevo]);
        setIds(prev => [...prev, id]);
        toast.success("Producto agregado al carrito");
      })
      .catch(() => toast.error("Error al agregar producto"))
      .finally(() => setLoading(false));
  };

  // Quitar producto
  const quitarProducto = (codigo) => {
    setProductos(prev => prev.filter(p => p.codigo_producto !== codigo));
    setIds(prev => prev.filter(id => id !== codigo));
    toast("Producto eliminado del carrito", { icon: "🗑️" });
  };

  // Vaciar carrito
  const vaciarCarrito = () => {
    setIds([]);
    setProductos([]);
    toast("Carrito vaciado", { icon: "🧺" });
  };

  // Controlar cantidad
  const controlCantidad = (accion, codigo) => {
    setProductos(prev =>
      prev
        .map(p => {
          if (p.codigo_producto === codigo) {
            if (accion === "suma") return { ...p, cantInCar: (p.cantInCar || 1) + 1 };
            if (accion === "resta") {
              const nuevaCant = (p.cantInCar || 1) - 1;
              return nuevaCant > 0 ? { ...p, cantInCar: nuevaCant } : null;
            }
          }
          return p;
        })
        .filter(p => p !== null)
    );
  };

  // Totales
  const total = productos.reduce((acc, p) => acc + (p.cantInCar || 1), 0);
  const subtotal = productos.reduce((acc, p) => acc + (Number(p.precio_producto) * (p.cantInCar || 1)), 0);
  const costo = subtotal - (cupon.descuento || 0);

  // Aplicar cupón
  const aplicarCupon = (codigo) => {
    if (!codigo) return toast.error("Ingrese un código");
    if (codigo === "DESCUENTO10") {
      setCupon({ codigo, descuento: subtotal * 0.1 });
      toast.success("Cupón aplicado: 10% de descuento");
    } else {
      setCupon({ codigo: null, descuento: 0 });
      toast.error("Cupón inválido");
    }
  };

  // Comprar
  const comprar = () => {
    if (productos.length === 0) return toast.error("Tu carrito está vacío");
    toast.success("Compra realizada con éxito 🎉");
    setIds([]);
    setProductos([]);
    setCupon({ codigo: null, descuento: 0 });
  };

  return (
    <carContext.Provider
      value={{
        ids,
        productos,
        cupon,
        total,
        costo,
        agregarProd,
        quitarProducto,
        vaciarCarrito,
        aplicarCupon,
        comprar,
        loading,
        controlCantidad,
      }}
    >
      {children}
    </carContext.Provider>
  );
};

export default StateCar;
