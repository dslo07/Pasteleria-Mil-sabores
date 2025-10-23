# Guia de Rutas Api
  Todas estas rutas estan pensadas para desarrollar un __CRUD__ sobre la tablas en la BD, se debe considerar que las proximamente se le debe integrar un __API WEB TOKEN__ para la seguridad de los datos. Ademas de considerar que todas las rutas del CRUD se usan desde el __Panel Administrador__ para el __Usuario__ solo puede usar el __Read__, exceptuando en el usuario donde podra __Actualizar__ solo algunos de sus propios datos.

## Categorias:
  * Create: http://localhost:5174/api/categorias/crear-categoria
  * Read: http://localhost:5174/api/categorias
    * http://localhost:5174/api/categorias/{id}
  * Update: http://localhost:5174/api/categorias/actualizar-categoria/{id}
  * Delete: http://localhost:5174/api/categorias/borrar-categoria/{id}

## Productos:
  * Create: http://localhost:5174/api/productos/crear-producto
  * Read: http://localhost:5174/api/productos
    * http://localhost:5174/api/producto/{id}
  * Update: http://localhost:5174/api/productos/actualizar-producto/{id}
  * Delete: http://localhost:5174/api/productos/borrar-producto/{id}

## Blog
  * Create: http://localhost:5174/api/blogs/crear-blog
  * Read: http://localhost:5174/api/blogs
    * http://localhost:5174/api/blog/{id}
  * Update: http://localhost:5174/api/blog/actualizar-blog/{id}
  * Delete: http://localhost:5174/api/blog/borrar-blog/{id}

## Login
  * Iniciar sesion: http://localhost:5174/api/usuarios/login

## Registro
  * Registrar: http://localhost:5174/api/usuarios/crear

# === Por Terminar === 

## Usuario
  * Create: http://localhost:5174/api/usuarios/crear-usuario //crear desde panel
  * Read: http://localhost:5174/api/usuarios 
    * http://localhost:5174/api/usuario/{id}
  * Update: http://localhost:5174/api/usuarios/actualizar-usuario/{id}
  * Delete: http://localhost:5174/api/usuarios/borrar-usuario/{id}

## Carrito de compras
  * Realizar compra

# === To Do ===
  Integrar API WEB TOKEN.

  Terminar End-Points.

  Integrar End-Points a React.

  Pruebas Unitarias con Swagger.

  Desplegar en AWS.




