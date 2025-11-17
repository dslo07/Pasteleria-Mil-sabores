
// ============================================
// 📁 PerfilUsuario/components/CampoTexto.jsx
// ============================================
const CampoTexto = ({ label, name, type = "text", value, onChange }) => {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input
        type={type}
        className="form-control"
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default CampoTexto;
