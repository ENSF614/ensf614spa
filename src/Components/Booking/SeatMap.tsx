import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Seat, getSeats } from "../../API/seats";
import { BookingInfo, getBookingInfo } from "../../API/bookingInfo";
import PageLayout from "../PageLayout";
import ConfirmSeatModal from "./ConfirmSeatModal";
import SeatButton from "./SeatButton";

interface Props{
    children?: any;
}

const SeatMap = ({
    children}:Props) => {

    const [seats, setSeats] = useState<Seat[]>()

    const loadSeats = () => {
        getSeats(1)
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
        getBookingInfo(1)
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
    
    const [seatState, setSeatState] = useState<Seat>();

    const handleConfirmSeat = (seat: Seat) => {
        setSeatState(seat);
        console.log(seat);
        setSeatModalShow(true);
    }

    const [seatModalShow, setSeatModalShow] = useState(false);
    const navigate = useNavigate();
    const seatIterator = createSeatIterator(seats);

    return(
        <PageLayout>
            <div id="seatGraph" className="container mt-5">
                <div className="row mb-5">
                    <div className="col">
                        <h2>Choose Your Seat</h2>
                    </div>
                </div>
            </div>

            <div className="container">
                {bookingInfo && [...Array(bookingInfo.numRows-1)].map((_, rowIndex) =>(
                    <div className="row mb-3">
                        <div className="col">
                            <div className="row">
                                {[...Array(bookingInfo.numCols)].map((_, colIndex) =>(
                                    <div className="col-md-3">
                                        <SeatButton 
                                            seat={seatIterator.next().value as Seat} 
                                            onClick={() => setSeatModalShow(true)} 
                                            onSeatClick={handleConfirmSeat}
                                            />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-md-1" />
                        <div className="col">
                            <div className="row">
                                {[...Array(bookingInfo.numCols)].map((_, colIndex) =>(
                                    <div className="col-md-3">
                                        <SeatButton 
                                            seat={seatIterator.next().value as Seat} 
                                            onClick={() => setSeatModalShow(true)} 
                                            onSeatClick={handleConfirmSeat}
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
                    onConfirm={() => navigate("/PaymentForm", {state: {seat: seatState}})}
                />
            </div>    
        </PageLayout>
    );
}

export default SeatMap;