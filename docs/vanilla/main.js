//============================================ Funciones para Pagina Principal del usuario ==================================================
  
  // categorias en el menu
  console.log(categorias);
  
  const categoriasMenu = document.getElementById("categorias-menu");
  const categoriasFooter = document.getElementById("categorias-footer");
  categorias.forEach(categoria => {
    categoriasMenu.innerHTML += ``;
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
 
      `;
      container.innerHTML += cardHTML;
    });
  };

  fectProductos();
//============================================ Funciones para Pagina Principal del usuario ==================================================