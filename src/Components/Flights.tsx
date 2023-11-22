
import {Flight, getFlights} from "../API/flights";
import {useEffect, useState} from "react";
import PageLayout from "./PageLayout";
import {Button} from "react-bootstrap";

const Flights = () => {

    const [flights , setFlights] = useState<Flight[]>()

    const loadFlights = () => {
        getFlights("")
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
                                    <Button>
                                        <p className="">Book Coach</p>

                                    </Button>
                                    <Button>
                                        <p>Business Class</p>
                                    </Button>
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
