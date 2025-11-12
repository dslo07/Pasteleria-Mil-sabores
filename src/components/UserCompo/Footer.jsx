import React, { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import metodosImg from '../../img/metodos-de-pago.webp';
import emailjs from 'emailjs-com';
import AlertModal from '../AlerModal';

const Footer = ({ nombre }) => {
  const serviceID = import.meta.env.VITE_EMAIL_SERVICE_ID;
  const templateID = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAIL_API_KEY;
  const url = `${import.meta.env.VITE_COMPONENTE_USUR_FOOTER}`;

  const { data: categorias, loading } = useFetch(url);
  const [email, setEmail] = useState("");
  const [modal, setModal] = useState(false);
  const [tituloModal, setTituloModal] = useState("Te hemos enviado un correo de confirmación!");
  const [descModal, setDescModal] = useState(
    "¡Suscríbete y recibe nuestras últimas novedades, ofertas exclusivas y recetas especiales directamente en tu correo! No te pierdas ninguna actualización de Mil Sabores."
  );

  const showModal = () => setModal(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        serviceID,
        templateID,
        { user_email: email },
        publicKey
      )
      .then(
        (result) => {
          console.log("Email enviado!", result.text);
          setTituloModal("Te hemos enviado un correo de confirmación!");
          setDescModal("¡Gracias por suscribirte a Mil Sabores!");
          showModal();
        },
        (error) => {
          console.error("Error al enviar el correo:", error.text);
          setTituloModal("Ha ocurrido un error");
          setDescModal(error.text);
          showModal();
        }
      );
  };

  return (
    <footer className="p-4 bg-white">
      
      {nombre}

      {modal && (
        <AlertModal
          setModal={setModal}
          titulo={tituloModal}
          desc={descModal}
        />
      )}

      <div className="row">
        {/* Navegación */}
        <div className="col-12 col-md-6 col-lg-2 mb-4">
          <h5>Navegación</h5>
          <ul className="nav flex-column">
            <li><a href="#" className="nav-link p-0 text-muted">Inicio</a></li>
            <li><a href="#" className="nav-link p-0 text-muted">Productos</a></li>
            <li><a href="#" className="nav-link p-0 text-muted">Blog</a></li>
            <li><a href="#" className="nav-link p-0 text-muted">Nosotros</a></li>
            <li><a href="#" className="nav-link p-0 text-muted">Contacto</a></li>
          </ul>
        </div>

        {/* Categorías */}
        <div className="col-12 col-md-6 col-lg-2 mb-4">
          <h5>Categorías</h5>
          <ul className="nav flex-column">
            {loading
              ? <li className="dropdown-item">Cargando...</li>
              : categorias.map(cat => (
                <li key={cat.nombre_categoria}>
                  <a className="dropdown-item my-2 border-bottom" href="#">
                    {cat.nombre_categoria}
                  </a>
                </li>
              ))}
          </ul>
        </div>

        {/* Métodos de pago */}
        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <h5>Métodos de pago</h5>
          <img src={metodosImg} alt="imagen de métodos de pago" className="img-fluid w-50" />
        </div>

        {/* Newsletter */}
        <div className="col-12 col-md-6 col-lg-5 mb-4">
          <form onSubmit={handleSubmit}>
            <h5>Obtén las últimas novedades de Mil Sabores</h5>
            <div className="d-flex flex-column flex-sm-row w-100 gap-2 mt-3">
              <input
                id="newsletter1"
                type="email"
                className="form-control"
                placeholder="Correo electrónico"
                aria-label="Correo electrónico"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                className="btn btn-primary"
                type="submit"
                style={{ backgroundColor: '#8B4513', border: '0' }}
              >
                Suscribirme
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer inferior */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center py-4 my-4 border-top">
        <p className="mb-2 mb-md-0 text-center text-md-start">
          © 2025 Pastelería Mil Sabores, desarrollado por Santiago Lopez y Harold Peralta.
        </p>
        <ul className="list-unstyled d-flex justify-content-center mb-0">
          <li className="ms-3"><a className="link-dark" href="#"><i className="bi bi-twitter"></i></a></li>
          <li className="ms-3"><a className="link-dark" href="#"><i className="bi bi-instagram"></i></a></li>
          <li className="ms-3"><a className="link-dark" href="#"><i className="bi bi-facebook"></i></a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
