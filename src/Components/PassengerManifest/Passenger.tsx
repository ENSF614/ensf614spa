import {Booking} from "../../API/booking";

type Props = {
    passenger: Booking
}

const Passenger:React.FC<Props> = ({
    passenger
                                   }) => {

    return (
        <div className="card p-1 mb-1">
            <div className="row mt-2 mx-1 px-1 d-flex align-items-center">
                <div className="col-4">
                    <p>{passenger.passengerName}</p>
                </div>
                <div className="col-4">
                    <p>{passenger.seatRow}{passenger.seatCol}</p>
                </div>
                <div className="col-4">
                    <p>{passenger.seatClass}</p>
                </div>
            </div>
        </div>

    )
};

export default Passenger;