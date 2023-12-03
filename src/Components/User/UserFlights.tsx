
import { UserFlightInfo, getUserFlightInfo } from "../../API/flights";
import {useEffect, useState} from "react";
import PageLayout from "../Layout/PageLayout";
import { Button } from "react-bootstrap";
import { useAuth } from "../../Auth/AuthProvider";
import ConfirmCancellationModal from "../Modals/ConfirmCancellationModal";
import { cancelBooking } from "../../API/booking";

const UserFlights = () => {

    const { user } = useAuth();

    const [flightInfos , setFlightInfos] = useState<UserFlightInfo[]>()
    const [flightInfo , setFlightInfo] = useState<UserFlightInfo>()
    const [cancelModal, setCancelModal] = useState<boolean>(false)
    

    const loadFlightInfo = () => {
        getUserFlightInfo(user!.userID)
            .then((response) => {
                console.log(response)
                setFlightInfos(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        loadFlightInfo()
    }, [])

    const cancelFlight = () => {
        cancelBooking({
            bookingID: flightInfo!.bookingID,
            userID: user!.userID,
            flightID: flightInfo!.flightID,
            cancelInsurance: flightInfo!.cancelInsurance
        })
        .then((response) => {
            if(response === "success"){
                for(let i=0; i<flightInfos!.length; i++){
                    if(flightInfos![i].bookingID == flightInfo?.bookingID){
                        flightInfos?.splice(i, 1)
                    }
                }
                setFlightInfos(flightInfos)
            }
            else {
                alert(response)
            }
        })
        .catch((error) => {
            alert("failed to cancel flight")
            console.log(error)
        })
        setCancelModal(false)
    }

    const handleCancelFlightClick = (flightInfo: UserFlightInfo) => {
        setFlightInfo(flightInfo)
        setCancelModal(true)
        console.log(`cancel flight: ${flightInfo}`)
    }


    return(
        <PageLayout>
            <div id="flight" className="container mt-5">
                <div className="row mb-5">
                    <div className="col">
                        <h2>Your Upcoming Flights</h2>
                    </div>

                </div>
                {flightInfos && flightInfos.map((flightInfo) => (
                    <div className="card mb-2">
                        <div className="card-header">
                            <h5>{flightInfo.flightNumber}</h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <h6>Origin</h6>
                                    <p>{flightInfo.origin}</p>
                                    <p>{new Date(flightInfo.departureDateTime).toLocaleString()}</p>
                                </div>
                                <div className="col">
                                    <h6>Destination</h6>
                                    <p>{flightInfo.destination}</p>
                                    <p>{new Date(flightInfo.arrivalDateTime).toLocaleString()}</p>

                                </div>
                                <div className="col">
                                    <h6>Passenger Name</h6>
                                    <p>{flightInfo.passengerName}</p>
                                </div>
                                <div className="col d-flex justify-content-center">
                                    <div className="row align-content-center">
                                        <Button variant="danger" color="red" style={{height: "4em"}}
                                                onClick={() => handleCancelFlightClick(flightInfo)}>
                                            <p className="">Cancel Flight</p>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <h6>Seat Class</h6>
                                    <p>{flightInfo.seatClass}</p>
                                </div>
                                <div className="col">
                                    <h6>Seat Number</h6>
                                    <p>{flightInfo.seatRow}{flightInfo.seatCol}</p>
                                </div>
                                <div className="col" > 
                                    <h6>Cancelation Insurance</h6>
                                    <p>{flightInfo.cancelInsurance ? "Yes" : "No"}</p>
                                </div>
                                <div className="col" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <ConfirmCancellationModal 
                show={cancelModal}
                onHide={() => setCancelModal(false)}
                onConfirm={cancelFlight}
                flightInfo={flightInfo}
            />
        </PageLayout>

    );
}

export default UserFlights;
