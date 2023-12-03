
import {Flight, FlightDetail, getFlights, getSearchedFlights} from "../../API/flights";
import {useEffect, useState} from "react";
import PageLayout from "../Layout/PageLayout";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from "../../Auth/AuthProvider";
import FlightButton from "./FlightButton";

const Flights = () => {

    const { user } = useAuth();
    const navigate = useNavigate();

    // const [flights , setFlights] = useState<Flight[]>()
    const [searchFlights, setSearchFlights] = useState<Flight[]>([])


    useEffect(() => {
        getFlights()
            .then((response) => {
                // console.log(response)
                setSearchFlights(response)
            })
            .catch((error:Error) => {
                console.log(error)
                alert(error.message)
            })

    },[] )

    const handleBookFlightsClick = (flight: Flight) => {
        if(user){
            navigate("/SeatMap", {state: {flight: flight}})
        }
        else {
            navigate("/login")
        }
    }

    return(
        <PageLayout>
            <div id="flight" className="container mt-5">
                <div className="row mb-5">
                    <div className="col">
                        <h2>Available Flights</h2>
                    </div>

                </div>
                {searchFlights && (searchFlights.length > 0 ? searchFlights.map((flight) => (
                            <div key={flight.flightId} className="card mb-2">
                                <div className="card-header">
                                    <h5>{flight.flightNo}</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <h6>Origin</h6>
                                            <p>{flight.origin}</p>
                                            <p>{new Date(flight.departureDateTime).toLocaleString()}</p>
                                        </div>
                                        <div className="col">
                                            <h6>Destination</h6>
                                            <p>{flight.destination}</p>
                                            <p>{new Date(flight.arrivalDateTime).toLocaleString()}</p>

                                        </div>
                                        <div className="col">
                                            <FlightButton onClick={handleBookFlightsClick}
                                                          flight={flight as Flight}>
                                                <p className="">Book Flight</p>
                                            </FlightButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                        :
                        <div className="card mb-2">
                            <div className="card-header">
                                <h5>No Flights Available</h5>
                            </div>
                            <div className="card-body">
                            </div>
                        </div>
                )}
            </div>

        </PageLayout>

    );
}

export default Flights;
