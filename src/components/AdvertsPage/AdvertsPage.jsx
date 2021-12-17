/**
 * - Listado de anuncios. Cada anuncio presentará nombre, precio, si es 
     compra o venta y los tags. No es necesario mostrar la foto en este 
     listado.
   - Manejará el estado cuando no haya ningún anuncio de mostrar, con un
     enlace a la página de creación de anuncios.
   - Cada anuncio del listado tendrá un enlace al detalle del anuncio (ruta
     /adverts/:id).
   - Zona de filtros: Formulario con distintos inputs, donde podremos 
     introducir los filtros que queremos aplicar sobre el listado.
      - Filtro por nombre (input tipo texto)
      - Filtro compra/venta (input tipo radio ‘venta’, ‘compra’, ‘todos’)
      - Filtro por precio (input donde podremos seleccionar el rango de 
        precios por el que queremos filtrar). Podeis usar un componente 
        como este. https://github.com/react-component/slider
      - Filtro por tags (input donde podremos seleccionar uno o varios 
        tags de los disponibles). Al aplicar el filtro se mostrarán los 
        anuncios que contengan todos los tags elegidos.
      >>> Podemos manejar el filtrado de anuncios de dos formas (a 
          elegir, aunque recomiendo la segunda para prácticar más con 
          el estado de React).
            - Recoger los filtros a aplicar en el front y enviarlos a la petición al
              API para traer los anuncios ya filtrados desde el backend (una 
              petición cada vez que se apliquen los filtros).
            - Traer los anuncios sin filtrar desde el backend, y aplicar el filtro 
              en el frontend con lo que se haya recogido en el formulario de 
              filtros (una única petición).
   - EXTRA: Estaría bien que la aplicación “recordase” las 
     preferencias de filtrado del usuario, de modo que cada vez que 
     se entre en esta ruta estuviesen ya marcados los últimos filtros 
     aplicados y con ellos se realizase la petición al API. Estas 
     preferencias deberían permanecer guardadas aunque cerremos 
     el navegador.
 */