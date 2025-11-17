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
    * http://localhost:5174/api/productos/{id}
  * Update: http://localhost:5174/api/productos/actualizar-producto/{id}
  * Delete: http://localhost:5174/api/productos/borrar-producto/{id}

## Blog
  * Create: http://localhost:5174/api/blogs/crear-blog
  * Read: http://localhost:5174/api/blogs
    * http://localhost:5174/api/blog/{id}
  * Update: http://localhost:5174/api/blogs/actualizar-blog/{id}
  * Delete: http://localhost:5174/api/blogs/borrar-blog/{id}

## Login
  * Iniciar sesion: http://localhost:5174/api/usuarios/login

## Registro
  * Registrar: http://localhost:5174/api/usuarios/crear

## Usuario
  * Create Admin: http://localhost:5174/api/usuario/crear-administrador
  * Read: http://localhost:5174/api/usuario
    * http://localhost:5174/api/usuario/{id}
  * Update: http://localhost:5174/api/usuario/actualizar-usuario/{id}
  * Delete: http://localhost:5174/api/usuario/borrar-usuario/{id}


## Documentacion con Swagger
  * Swagger: http://localhost:5174/docs


CRUD Productos: funciona completo,
CRUD Categorias: funciona completo,
CRUD BLOG: funciona completo,
CRUD Usuario: falta Editar 
    NOTA Usuario: Eliminar SI BORRA DE LA DB NO LO *DESACTIVA*, 
                  si se va a cambiar, solo cambiar las query del endpoint.

CRUD ventas: solo vista | falta desarrollar endpoints | Falta empezar 
