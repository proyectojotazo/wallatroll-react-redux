import { useEffect } from "react";
import { PropTypes } from "prop-types";

import { useParams } from "react-router-dom";

import { Card, Button, ListGroup, Container, Spinner } from "react-bootstrap";

export const AdvertPage = ({ advert, isLoading, isDeleting, getAd, deleteAd }) => {
  const { id } = useParams();

  useEffect(() => {
    getAd(id);
  }, [getAd, id]);

  const img = advert?.photo
    ? `${process.env.REACT_APP_API_BASE_URL}${advert.photo}`
    : "https://via.placeholder.com/150x100?text=No Image";

  if (isLoading) {
    return (
      <Container className="mx-auto w-50 align-center text-center">
        <h1>{isDeleting ? "Deleting Advert..." : "Loading advert..."}</h1>
        <Spinner animation="border" variant="info" />;
      </Container>
    );
  }

  return (
    <>
      <Card className="text-center mx-auto p-0" style={{ width: "40%" }}>
        <Card.Img
          variant="top"
          src={img}
          style={{ maxHeight: "280px", objectFit: "cover" }}
        />
        <Card.Header>{advert?.name}</Card.Header>
        <Card.Body>
          <Card.Title>Description</Card.Title>
          <Card.Text>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis
            obcaecati eos totam deserunt, earum at in pariatur ullam voluptate
            ea commodi sint nemo voluptatem impedit est aspernatur assumenda
            amet. Omnis!
          </Card.Text>
          <Card.Text>Price: {advert?.price}€</Card.Text>
          <Card.Text>{advert?.sale ? "Sell" : "Buy"}</Card.Text>
          <Card.Header className="text-center">Tags</Card.Header>
          <ListGroup variant="flush">
            {advert?.tags &&
              advert.tags.map((tag, i) => (
                <ListGroup.Item key={i}>{tag}</ListGroup.Item>
              ))}
          </ListGroup>
          <Button
            variant="danger"
            onClick={() => deleteAd(id)}
            style={{ width: "40%" }}
          >
            Delete
          </Button>
        </Card.Body>
        <Card.Footer className="text-muted">{advert?.createdAt}</Card.Footer>
      </Card>
    </>
  );
};

AdvertPage.propTypes = {
  advert: PropTypes.shape({
    id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string,
    sale: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  isLoading: PropTypes.bool.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  getAd: PropTypes.func.isRequired,
  deleteAd: PropTypes.func.isRequired,
};

export default AdvertPage;
