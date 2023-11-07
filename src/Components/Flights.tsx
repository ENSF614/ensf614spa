
import {Flight, getFlights} from "../API/flights";
import {useEffect, useState} from "react";
import PageLayout from "./PageLayout";

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
            <div id="flight">
                {flights && flights.map((flight) => (
                    <div>
                        <div key={flight.flightNo}>
                            <h1>{flight.flightNo}</h1>
                            <h3>{flight.origin} to {flight.destination}</h3>
                        </div>
                    </div>

                ))}
            </div>

        </PageLayout>

    );
}

export default Flights;
