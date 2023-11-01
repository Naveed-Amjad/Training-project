// library imports
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// component imports
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const OrderPlaced = () => {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const navigate = useNavigate();
  return (
    <>
      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Order Placed</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, your order Placed Successfull, Happy Shoping!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { handleClose(); navigate('/shopingbag') }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrderPlaced;
