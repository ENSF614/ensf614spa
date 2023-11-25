import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmSeatModal(props: any) {

    console.log(props.seat)
    
    const getSeatClass = (businessClass: boolean) => {
      if(businessClass)
        return "business"
      return "economy"
    }

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
          <h4>
            Selected seat {props.seat?.seatRow}{props.seat?.seatCol} in {getSeatClass(props.seat?.businessClass)} class
          </h4>
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