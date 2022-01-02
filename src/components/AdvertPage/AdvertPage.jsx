/**
 * - Detalle del anuncio cuyo id es recogido de la URL. Mostrará la foto del 
     anuncio o un placeholder en su lugar si no existe foto.
   - Si el anuncio no existe deberia redirigirnos al NotFoundPage.
   - Botón para poder borrar el anuncio. Antes de borrar mostar una 
     confirmación al usuario (algo más elaborado que un window.confirm, 
     jugando con el estado de React). Tras el borrado debería redireccionar 
     al listado de anuncios
 */
import { useState, useEffect } from "react";
import { Card, Button, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";

import CustomModal from "../common/CustomModal";

import adsServices from "../../api/adsServices";

const getAd = async (id) => await adsServices.getAd(id);

const AdvertPage = ({ history }) => {
  const { id } = useParams();
  const [ad, setAd] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log(id)
    getAd(id)
      .then((ad) => setAd(ad))
      .catch((err) => console.error(err));
  }, [id]);

  const deleteAd = async () => {
    try {
      await adsServices.deleteAd(id);
      // TODO: Mostrar modal de anuncio borrado?
      history.replace("/adverts");
    } catch (error) {
      // TODO: Manejar error si anuncio ya borrado
      console.error(error);
    }
  };

  const img = ad.photo
    ? `${process.env.REACT_APP_API_BASE_URL}${ad.photo}`
    : "https://via.placeholder.com/150x100?text=No Image";

  return (
    <>
      {showModal && (
        <CustomModal
          show={showModal}
          title={`Delete ${ad.name}`}
          body="Are you sure?"
          closeModal={() => setShowModal(false)}
          action={deleteAd}
        />
      )}
      <Card className="text-center mx-auto p-0" style={{ width: "40%" }}>
        <Card.Img
          variant="top"
          src={img}
          style={{ maxHeight: "280px", objectFit: "cover" }}
        />
        <Card.Header>{ad.name}</Card.Header>
        <Card.Body>
          <Card.Title>Description</Card.Title>
          <Card.Text>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis
            obcaecati eos totam deserunt, earum at in pariatur ullam voluptate
            ea commodi sint nemo voluptatem impedit est aspernatur assumenda
            amet. Omnis!
          </Card.Text>
          <Card.Text>Price: {ad.price}€</Card.Text>
          <Card.Text>{ad.sale ? "Sell" : "Buy"}</Card.Text>
          <Card.Header className="text-center">Tags</Card.Header>
          <ListGroup variant="flush">
            {ad.tags &&
              ad.tags.map((tag, i) => (
                <ListGroup.Item key={i}>{tag}</ListGroup.Item>
              ))}
          </ListGroup>
          <Button
            variant="danger"
            onClick={() => setShowModal(true)}
            style={{ width: "50%" }}
          >
            Delete
          </Button>
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
      </Card>
    </>
  );
};

export default AdvertPage;
