import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmSeatModal(props: any) {
    
    const [passengerName, setPassengerName] = useState<string>('')

    const getSeatClass = (businessClass: boolean) => {
      if(businessClass)
        return "business"
      return "economy"
    }

    const handleConfirmClick = () => {
      props.seat.passengerName =  passengerName
      props.onConfirm(props.seat)
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
          <div className="row">
            <h4>
              Selected seat {props.seat?.seatRow}{props.seat?.seatCol} in {getSeatClass(props.seat?.businessClass)} class
            </h4>
          </div>
          <div className="row">
            <p>
              Please enter the passenger name.
            </p>
          </div>
          <div className="row">
            <input className="form-control" id="form7" 
              type="text" placeholder="Passenger Name" 
              onChange={e => setPassengerName(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>Close</Button>
          <Button variant="primary" onClick={handleConfirmClick}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    );
}

export default ConfirmSeatModal;