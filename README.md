# Práctica fundamentos React

---

## Enunciado

- Vamos a crear una aplicación de tipo dashboard que será la interfaz gráfica desde la que podremos gestionar el API de anuncios Nodepop.

### Backend

---

- Usaremos el siguiente proyecto como backend.

  > [nodepop-api](https://github.com/davidjj76/nodepop-api)

- Una vez en marcha, tendremos nuestro backend corriendo en el puerto 3001
  (configurable via archivo .env). Tenéis disponible un swagger en la ruta `/swagger`
  donde podréis probar los diferentes endpoints y ver cómo pasar los datos en las
  peticiones.

- En el backend tendremos disponibles los siguientes endpoints:

  - `/api/auth/signup`
    - **_POST_**
      - Nos permite crear usuarios.
  - `/api/auth/me`
    - **_GET_**
      - Nos devuelve la información del usuario autenticado
  - `/api/auth/login`
    - **_POST_**
      - Devuelve un token de acceso cuando le pasamos un email y password de un usuario correctos.
  - `/api/v1/adverts`
    - **_GET_** - Devuelve un listado de anuncios, con la posiblidad de aplicar
      filtros con la query que enviemos en la URL. Los filtros posibles son: - **_name=coche:_** que el nombre empiece por “coche”, sin importar
      MAY/MIN - **_sale=true/false:_** si el anuncio es de compra o venta - **_price=0-25000:_** precio dentro del rango indicado - **_tags=motor,work...:_** que tenga todos los tags
    - **_POST_**
      - Crea un anuncio.
  - `/api/v1/adverts/tags`
    - **_GET_**
      - Devuelve el listado de tags disponibles.
  - `/api/v1/adverts/:id`
    - **_GET_**
      - Devuelve un único anuncio por Id.
    - **_DELETE_**
      - Borra un anuncio por Id.

  > Todos los endpoints bajo `/adverts` requieren que se envíe el token
  > proporcionado en el endpoint de **_login_**. Se ha de enviar en la cabecera de la petición de la siguiente forma:

  ```
  Header[‘Authorization’] = `Bearer ${token}`
  ```

  > Los datos del backend son persistidos en una base de datos sqlite en el directorio
  > `/data` (de ese modo no os teneís que preocupar de crear bases de datos).
  > Las fotos subidas al backend son almacenadas en el directorio `/uploads` y servidas
  > por el backend cómo contenido estático en `/public` (la ruta pública de cada foto es
  > almacenada en la base de datos).