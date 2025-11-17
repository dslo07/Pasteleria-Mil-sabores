

// ============================================
// 📁 PerfilUsuario/components/InfoUsuario.jsx
// ============================================
const InfoUsuario = ({ usuario }) => {
  return (
    <>
      <img
        src="https://avatars.githubusercontent.com/u/147568951?s=400&u=2f8703b990535553a8b915da8db89f4a11115349&v=4"
        alt={`Foto de perfil de ${usuario.nombres_cliente}`}
        className="rounded-circle border border-3 mx-auto mb-3"
        width="120"
      />

      <h4 className="mb-0">
        {usuario.nombres_cliente} {usuario.appat_cliente}
      </h4>
      <p className="text-muted mb-0">{usuario.email_cliente}</p>
      <hr />
      <p className="text-muted">Nacimiento: {usuario.fecha_nacimiento}</p>
    </>
  );
};

export default InfoUsuario;