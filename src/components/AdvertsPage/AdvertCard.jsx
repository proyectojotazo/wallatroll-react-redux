import { Card, Button, ListGroup } from "react-bootstrap";

const AdvertCard = ({ ad, history }) => {
  const img = ad.photo
    ? `${process.env.REACT_APP_API_BASE_URL}${ad.photo}`
    : "https://via.placeholder.com/150x100?text=No Image";

  const handleRedirect = () => {
    // Redireccionar a la pagina del anuncio
    history.push(`/advert/${ad.id}`);
  };

  return (
    <Card className="my-2">
      <Card.Img
        variant="top"
        src={img}
        style={{ height: "230px", objectFit: "cover" }}
      />
      <Card.Header>
        <Card.Title className="text-center">{ad.name}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>Price: {ad.price}€</Card.Text>
        <Card.Text>{ad.sale ? "Sell" : "Buy"}</Card.Text>
        <Card.Header className="text-center">Tags</Card.Header>
        <ListGroup variant="flush">
          {ad.tags.map((tag, i) => (
            <ListGroup.Item key={i}>{tag}</ListGroup.Item>
          ))}
        </ListGroup>
        <Button
          className="w-100 mt-3"
          variant="primary"
          onClick={handleRedirect}
        >
          Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default AdvertCard;
