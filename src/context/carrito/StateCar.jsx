import { useState, useEffect } from 'react';
import { carContext } from './carContext';
import toast from 'react-hot-toast';

  const API_URL = `${import.meta.env.VITE_API_CARRITO}`;
  const StateCar = ({ children }) => {
  const [ids, setIds] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cupon, setCupon] = useState({ codigo: null, descuento: 0 });
  const [cuponFELICES50, setCuponFELICES50] = useState(false); 
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

  // Inicializar productos según IDs
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

  // Agregar producto
  const agregarProd = (id) => {
    if (ids.includes(id)) return toast.error("El producto ya está en el carrito");

    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const productoNuevo = data.find(p => p.codigo_producto === id);
        if (!productoNuevo) return toast.error("Producto no encontrado");
        productoNuevo.cantInCar = 1;
        setProductos(prev => [...prev, productoNuevo]);
        setIds(prev => [...prev, id]);
        toast.success("Producto agregado al carrito");
      })
      .catch(() => toast.error("Error al agregar producto"));
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
  
  // Costo con descuento FELICES50
  const costo = (subtotal * (cuponFELICES50 ? 0.9 : 1)) - (cupon.descuento || 0);

  // Aplicar cupon
  const aplicarCupon = (codigo) => {
    if (!codigo) return toast.error("Ingrese un código");

    if (codigo === "DESCUENTO10") {
      setCupon({ codigo, descuento: subtotal * 0.1 });
      toast.success("Cupón aplicado: 10% de descuento");
    } else if (codigo === "FELICES50") {
      setCuponFELICES50(true);
      toast.success("Cupón FELICES50 aplicado: 10% de descuento de por vida!");
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
