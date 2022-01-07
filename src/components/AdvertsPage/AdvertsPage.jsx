/**
 * - Zona de filtros: Formulario con distintos inputs, donde podremos 
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
import { useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import AdvertCard from "./AdvertCard";

import { getUi, getAdverts } from "./../../store/selectors";
import { getAds } from "./../../store/actions";

const AdvertsPage = ({ history }) => {
  const { isLoading } = useSelector(getUi);
  const ads = useSelector(getAdverts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAds());
  }, [dispatch]);

  if (isLoading) {
    return (
      <Container className="mx-auto w-50 align-center text-center">
        <h1>Loading resources...</h1>
        <Spinner animation="border" variant="info" />;
      </Container>
    );
  }

  return ads.length === 0 ? (
    <Container className="mx-auto w-50 align-center">
      <h1 className="text-center">No hay anuncios</h1>
      <Link
        to="/adverts/new"
        className="d-block text-center text-decoration-none"
      >
        Create Ad
      </Link>
    </Container>
  ) : (
    <Container>
      <Row xs={1} sm={2} md={3} lg={5} className="justify-content-center">
        {ads.map((ad) => (
          <Col key={ad.id}>
            <AdvertCard history={history} key={ad.id} ad={ad} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AdvertsPage;
