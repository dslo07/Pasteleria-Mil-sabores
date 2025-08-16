//============================================ Funciones para Pagina Principal del usuario ==================================================
const container = document.getElementById("productos-container");
  let productos = [];
  let categorias = ["Tortas Cuadradas","Tortas Circulares","Postres Individuales","Productos Sin Azúcar","Pastelería Tradicional","Productos Sin Gluten","Productos Veganos","Tortas Especiales"];
  // categorias en el menu
  console.log(categorias);
  
  const categoriasMenu = document.getElementById("categorias-menu");
  const categoriasFooter = document.getElementById("categorias-footer");
  categorias.forEach(categoria => {
    categoriasMenu.innerHTML += `<li><a class="dropdown-item my-2 border-bottom " href="#">${categoria}</a></li>`;
  })
  categorias.forEach(categoria => {
    categoriasFooter.innerHTML += `<li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">${categoria}</a></li>
`;
  })

  //cargar productos desde el JSON
  const fectProductos = async () => {
    let res = await fetch("src/ApiProductos.json");
    let data = await res.json();
    productos = data;

    productos.slice(0, 8).forEach((producto) => {
      const cardHTML = `
        <div class="card-Producto h-100 d-flex flex-column">
          <img src="${producto.imagenURL}" class="card-img-top border rounded-0" alt="${producto.nombre}" />
          <div class="card-body d-flex flex-column flex-grow-1">
            <div>
              <div class="d-flex justify-content-between align-items-center gap-2">
                <span class="badge">${producto.categoria}</span>
              </div>
              <h5 class="fs-3 fw-bold">${producto.nombre}</h5>
            </div>

            <!-- Contenedor para precio + botones -->
            <div class="mt-auto d-flex flex-column gap-2">
              <span class="badge-precio fw-medium">Precio: $${producto.precio} ${producto.moneda}</span>
              <div class="d-flex gap-2">
                <button class="btn btn-comprar w-100  cursor-pointer">Ver Producto</button>
                <button class="btn btn-outline-danger py-1 px-2 ali">
                  <i class="bi bi-basket3-fill color-red"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
      container.innerHTML += cardHTML;
    });
  };

  fectProductos();
//============================================ Funciones para Pagina Principal del usuario ==================================================