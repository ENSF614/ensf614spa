
import {Flight, getFlights} from "../API/flights";
import {useEffect, useState} from "react";
import PageLayout from "./PageLayout";
import FlightButton from "./FlightButton";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from "../Auth/AuthProvider";

const Flights = () => {

    const { user } = useAuth();
    const { state } = useLocation();
    const navigate = useNavigate();

    const origin = state?.origin
    const destination = state?.destination
    const departureDateTime = state?.startDate
    console.log(origin)
    console.log(destination)
    console.log(departureDateTime)

    const [flights , setFlights] = useState<Flight[]>()
    const [searchFlights, setSearchFlights] = useState<Flight[]>()
    
    console.log(origin)

    const findSearchedFlights = () => {
        console.log(`search flights origin: ${origin}`)
        if (origin != undefined){
            let chosenFlights: Flight[] = []
            console.log("search flights run")
            console.log(flights)
            for(const flight of flights!){
                let flightDateOnly = flight.departureDateTime.toString().split('T')[0]
                let dateOnly = departureDateTime.toISOString().split('T')[0]
                if(flight.origin === origin 
                    && flight.destination === destination
                    && flightDateOnly === dateOnly){
                        chosenFlights.push(flight)
                        console.log(flightDateOnly)
                        console.log(dateOnly)
                }
            }
            console.log(chosenFlights)
            setSearchFlights(chosenFlights)
        }
    }

    const loadFlights = async () => {
        try {
            let response = await getFlights()
            setFlights(response)
            findSearchedFlights()
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        loadFlights()
    }, [])

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
                {origin ? 
                (searchFlights && (searchFlights.length > 0 ? searchFlights.map((flight) => (
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
                ))
                :
                    <div className="card mb-2">
                        <div className="card-header">
                            <h5>No Flights Available from {origin} to {destination} on {departureDateTime.toISOString().split('T')[0]}</h5>
                        </div>
                        <div className="card-body">
                        </div>
                    </div>
                ))
                :
                (flights && flights.map((flight) => (
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
                )))}
            </div>

        </PageLayout>

    );
}

export default Flights;
