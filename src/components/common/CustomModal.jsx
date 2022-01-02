import { Modal, Button } from "react-bootstrap";

const CustomModal = ({ show, title, body, closeModal, action }) => {

  const handleModal = e => {
    const { value: btnPressed } = e.target

    if (btnPressed === "yes") {
      action()
    }

    closeModal()
  }
  return (
    <Modal show={show}>
      <Modal.Header onClick={closeModal} closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="text-center my-2">{body}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button value="yes" variant="success" onClick={handleModal} size="lg">
          Yes
        </Button>
        <Button variant="danger" size="lg" onClick={handleModal}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal