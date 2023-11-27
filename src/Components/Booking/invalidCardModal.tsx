import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function InvalidCardModal(props: any) {

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Invalid Card Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>
            Please enter valid card information.
          </h6>
          <h6>Number: 4444-4444-4444-4444</h6>
          <h6>Expiry: 12/24</h6>
          <h6>CVV: 123</h6>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
}

export default InvalidCardModal;