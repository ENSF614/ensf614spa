import {useEffect, useState} from "react";
import { Button, Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { BookingInfo, getBookingInfo } from "../../API/bookingInfo";
import PageLayout from "../PageLayout";
import ConfirmSeatModal from "../Payment/ConfirmSeatModal";
import SeatButton from "./SeatButton";
import {getSeats, Seat} from "../../API/seats";
import { Flight } from "../../API/flights";

const SeatMap = () => {

    const { state } = useLocation()
    const navigate = useNavigate()

    const seatsList: Seat[] = []
    const flight = state?.flight

    const [seats, setSeats] = useState<Seat[]>()
    const [seatState, setSeatState] = useState<Seat>()
    const [selectedSeats, setSelectedSeats] = useState<Seat[]>(seatsList)
    const [seatModalShow, setSeatModalShow] = useState(false)
    
    const loadSeats = () => {
        getSeats(flight.flightId)
            .then((response) => {
                console.log(response)
                setSeats(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        loadSeats()
    }, [])

    const [bookingInfo, setBookingInfo] = useState<BookingInfo>()

    const loadBookingInfo = () => {
        getBookingInfo(flight.flightId)
            .then((response) => {
                console.log(response)
                setBookingInfo(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        loadBookingInfo()
    }, [])

    function* createSeatIterator<Seat>(seats: Seat[] | undefined) {
        if(seats)
            for(const seat of seats){
                yield seat;
            }
    }
    
    const handleSeatButtonClick = (seat: Seat) => {
        setSeatState(seat);
        setSeatModalShow(true);
    }

    const handleConfirmSeat = (seat: Seat, seatsList: Seat[]) => {
        seat.booked = true;
        setSeatState(seat);
        selectedSeats.push(seat);
        console.log(seatsList)
        setSelectedSeats(selectedSeats);
        setSeatModalShow(false);
    }

    const seatIterator = createSeatIterator(seats);

    return(
        <PageLayout>
            <div className="row">
                <div className="col-md-9">
                    <div className="row mb-3 mt-5">
                        <div className="col">
                            <div className="row text-center">
                                <h2>Choose Your Seat</h2>
                            </div>
                            <div className="row">
                                <div className="col d-flex justify-content-center">
                                    <Button variant="info"></Button>
                                    <h6>Business Class</h6>
                                </div>
                                <div className="col d-flex justify-content-center">
                                    <Button variant="primary"></Button>
                                    <h6>Economy Class</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-9">
                    <div className="container p-3 bg-secondary bg-opacity-75">
                        {bookingInfo && [...Array(bookingInfo.numRows-1)].map((_, rowIndex) =>(
                            <div className="row mb-3">
                                <div className="col">
                                    <div className="row">
                                        {[...Array(bookingInfo.numCols)].map((_, colIndex) =>(
                                            <div className="col">
                                                <SeatButton 
                                                    seat={seatIterator.next().value as Seat} 
                                                    onClick={handleSeatButtonClick}
                                                    />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-md-1" />
                                <div className="col">
                                    <div className="row">
                                        {[...Array(bookingInfo.numCols)].map((_, colIndex) =>(
                                            <div className="col d-flex justify-content-end">
                                                <SeatButton 
                                                    seat={seatIterator.next().value as Seat} 
                                                    onClick={handleSeatButtonClick}
                                                    />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}


                        <ConfirmSeatModal
                            show={seatModalShow}
                            seat={seatState}
                            onHide={() => setSeatModalShow(false)}
                            onConfirm={handleConfirmSeat}
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <Card>
                        <Card.Header>
                            <Card.Title>Selected Seats</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <div>
                                {selectedSeats && selectedSeats.map((seat, idx) =>(
                                    <div className="row">
                                        <p>
                                            <strong>Seat {seat.seatRow}{seat.seatCol}: </strong>
                                            {seat.passengerName}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <Button variant="primary" onClick={() => navigate("/PaymentForm", {state: {seats: selectedSeats}})}>Checkout</Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </PageLayout>
    );
}

export default SeatMap;