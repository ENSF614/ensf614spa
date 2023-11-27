import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function PaymentConfirmedModal(props: any) {

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
          <p>
            Confirmation email and ticket have been emailed to 
            USER EMAIL HERE.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
}

export default PaymentConfirmedModal;