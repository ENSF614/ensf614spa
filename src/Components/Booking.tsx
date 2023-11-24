import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { BookedSeats, getBookedSeats } from "../API/bookedSeats";
import { BookingInfo, getBookingInfo } from "../API/bookingInfo";
import PageLayout from "./PageLayout";
import Button from 'react-bootstrap/Button';
import ConfirmSeatModal from "./ConfirmSeatModal";

const seatFig: string = "airplaneseat.png";
const seatModal: string = "/SeatModal";

interface Props{
    children?: any;
}

const Booking = ({
    children}:Props) => {

    const [bookedSeats, setBookedSeats] = useState<BookedSeats[]>()

    const loadBookedSeats = () => {
        getBookedSeats("", 1)
            .then((response) => {
                console.log(response)
                setBookedSeats(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        loadBookedSeats()
    }, [])

    const [bookingInfo, setBookingInfo] = useState<BookingInfo>()

    const loadBookingInfo = () => {
        getBookingInfo("", 1)
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

    const [seatModalShow, setSeatModalShow] = useState(false);
    const navigate = useNavigate();

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
                {bookingInfo && [...Array(bookingInfo.numRows)].map((_, rowIndex) =>(
                    <div className="row mb-3">
                        <div className="col">
                            <div className="row">
                                {[...Array(bookingInfo.numCols)].map((_, colIndex) =>(
                                    <div className="col">
                                        <Button variant="primary" onClick={() => setSeatModalShow(true)}>
                                            <img src={seatFig} width="42" height="42"></img>
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col">
                            <div className="row">
                                {[...Array(bookingInfo.numCols)].map((_, colIndex) =>(
                                    <div className="col">
                                        <a href={seatModal}>
                                            <img src={seatFig} width="42" height="42"></img>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}


                <ConfirmSeatModal
                    show={seatModalShow}
                    onHide={() => setSeatModalShow(false)}
                    onConfirm={() => navigate("/BuyTicket")}
                />
            </div>    
        </PageLayout>
    );
}

export default Booking;