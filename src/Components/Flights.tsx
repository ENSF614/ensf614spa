
import {Flight, getFlights} from "../API/flights";
import {useEffect, useState} from "react";
import PageLayout from "./PageLayout";
import FlightButton from "./FlightButton";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../Auth/AuthProvider";

const Flights = () => {

    const { user } = useAuth();
    const navigate = useNavigate();

    const [flights , setFlights] = useState<Flight[]>()
    

    const loadFlights = () => {
        getFlights()
            .then((response) => {
                console.log(response)
                setFlights(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        loadFlights()
    }, [])

    const handleBookFlightsClick = (flight: Flight) => {
        if(user){
            console.log(flight.flightId)
            navigate("/SeatMap", {state: {flightID: flight}})
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
                {flights && flights.map((flight) => (
                    <div className="card mb-2">
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
                ))}
            </div>

        </PageLayout>

    );
}

export default Flights;
