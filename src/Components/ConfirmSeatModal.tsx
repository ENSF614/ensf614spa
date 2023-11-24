import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmSeatModal(props: any) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Confirm Seat Selection
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Select Seat add in seat row col here</h4>
          <p>
            Do you want to proceed to checkout?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>Close</Button>
          <Button variant="primary" onClick={props.onConfirm}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    );
}

export default ConfirmSeatModal;