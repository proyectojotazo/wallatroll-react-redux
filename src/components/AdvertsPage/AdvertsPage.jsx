/**
   - EXTRA: Estaría bien que la aplicación “recordase” las 
     preferencias de filtrado del usuario, de modo que cada vez que 
     se entre en esta ruta estuviesen ya marcados los últimos filtros 
     aplicados y con ellos se realizase la petición al API. Estas 
     preferencias deberían permanecer guardadas aunque cerremos 
     el navegador.
 */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

import AdvertCard from "./AdvertCard";
import FormFilters from "./FormFilters";
import { filteredAdverts } from "./filteredAdverts";

const AdvertsPage = ({ history, isLoading, ads, getAds }) => {
  const [filters, setFilters] = useState({
    name: "",
    sale: "all",
    price: [],
    tags: [],
  });

  const adsFiltered = filteredAdverts(ads, filters);

  const adsToShow = adsFiltered.length !== 0 ? adsFiltered : ads;

  useEffect(() => {
    getAds();
  }, [getAds]);

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
      <FormFilters
        filters={filters}
        setFilters={setFilters}
        prices={ads.map((ad) => ad.price)}
      />
      {adsFiltered.length === 0 ? (
        <h3 className="text-center">No ads founded</h3>
      ) : (
        <Row xs={1} sm={2} md={3} lg={5} className="justify-content-center">
          {adsToShow.map((ad) => (
            <Col key={ad.id}>
              <AdvertCard history={history} key={ad.id} ad={ad} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

AdvertsPage.propTypes = {
  history: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  ads: PropTypes.arrayOf(
    PropTypes.shape({
      createdAt: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      photo: PropTypes.string,
      price: PropTypes.number.isRequired,
      sale: PropTypes.bool.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  getAds: PropTypes.func.isRequired,
};

export default AdvertsPage;
