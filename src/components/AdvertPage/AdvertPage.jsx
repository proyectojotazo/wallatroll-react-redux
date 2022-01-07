import { useState, useEffect } from "react";
import { Card, Button, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";

import adsServices from "../../api/adsServices";

const AdvertPage = ({ history }) => {
  // TODO: Mostrar un cargando mientras se carga el anuncio
  const { id } = useParams();
  const [ad, setAd] = useState([]);
  
  useEffect(() => {
    adsServices
      .getAd(id)
      .then(setAd)
      .catch((error) => history.replace("/404"));
  }, [id, history]);

  const deleteAd = async () => {
    await adsServices.deleteAd(id, history);
  };

  const img = ad.photo
    ? `${process.env.REACT_APP_API_BASE_URL}${ad.photo}`
    : "https://via.placeholder.com/150x100?text=No Image";

  return (
    <>
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
          <Button variant="danger" onClick={deleteAd} style={{ width: "50%" }}>
            Delete
          </Button>
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
      </Card>
    </>
  );
};

export default AdvertPage;
