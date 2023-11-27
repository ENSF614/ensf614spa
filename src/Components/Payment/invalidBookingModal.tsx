import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function InvalidBookingModal(props: any) {

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Unable to make booking
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Something has gone wrong. Please try again later.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
}

export default InvalidBookingModal;