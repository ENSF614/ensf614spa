import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAuth } from "../../Auth/AuthProvider";

function PaymentConfirmedModal(props: any) {

  const { user } = useAuth();

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Payment Confirmed
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>
          Thank you for booking with ENSF614 Airlines!
        </h4>
        <p>
          Confirmation email and ticket have been emailed to {user?.email}.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PaymentConfirmedModal;