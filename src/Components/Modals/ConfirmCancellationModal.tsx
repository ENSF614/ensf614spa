import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmCancellationModal(props: any) {

    console.log(props.flightInfo)

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Confirm Flight Cancellation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4>
              Confirm cancellation of flight {props.flightInfo?.flightNumber} from {props.flightInfo?.origin} to {props.flightInfo?.destination}?
            </h4>
            {props.flightInfo?.cancelInsurance &&
                <h3>
                    You have purchased cancellation insurance for this flight. You will be refunded the full amount of your ticket.
                </h3>}
            {!props.flightInfo?.cancelInsurance &&
                <h6 className="text-danger">
                    You have NOT purchased cancellation insurance for this flight. You will NOT be refunded the full amount of your ticket.
                </h6>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>Close</Button>
          <Button variant="primary" onClick={props.onConfirm}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    );
}

export default ConfirmCancellationModal;