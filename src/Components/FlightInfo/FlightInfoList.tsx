import PageLayout from "../Layout/PageLayout";
import {useEffect, useState} from "react";

import {FlightManifest, getManifests} from "../../API/manifest";
import FlightInfo from "./FlightInfo";
import {Flight, getFlights} from "../../API/flights";




const Users = () =>{

    const [flights, setFlights] = useState<Flight[]>([])


    useEffect(()=>{
        getFlights()
            .then((response) => {
                setFlights(response)
                console.dir(response)
            })
            .catch(error =>{
                console.log(error)
            })
    }, [])


    return(
        <PageLayout>

            <h1>Flight Information</h1>

            <div className="container">
                <div className="row mt-5 px-1">
                    <div className="col-6">
                        <h6>Flight Detail</h6>
                    </div>
                    <div className="col-2">
                        <h6>Aircraft</h6>
                    </div>
                    <div className="col-2">
                        <h6>Passenger Manifest</h6>
                    </div>
                    <div className="col-2">
                        <h6>Crew</h6>
                    </div>
                </div>
                {flights && flights.map((flight:Flight)=>(
                    <FlightInfo key={flight.flightId} flight={flight}/>
                ))}
            </div>

        </PageLayout>
    )
}

export default Users;