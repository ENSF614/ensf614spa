import {Booking} from "../../API/booking";
import {useParams} from "react-router-dom";
import {FlightManifest, getManifestByFlight} from "../../API/manifest";
import {useEffect, useState} from "react";
import PageLayout from "../Layout/PageLayout";
import Passenger from "../PassengerManifest/Passenger";
import {getAircraft, AircraftType} from "../../API/aircraft";
import AircraftListItem from "./AircraftListItem";





const AircraftList = () => {

    const {flightId} = useParams<string>()

    const [aircraftList, setAircraftList] = useState<AircraftType[] | undefined>()

    useEffect(()=>{
        getAircraft()
            .then((response) => {
                setAircraftList(response)
                console.dir(response)
            }).catch(error =>{
            console.log(error)
        })

    }, [])

    return (
        <PageLayout>
            <div className="container">
                <div className="row mt-5 px-1">
                    <div className="col-3">
                        <h6>Tail Number</h6>
                    </div>
                    <div className="col-3">
                        <h6>Manufacturer</h6>
                    </div>
                    <div className="col-3">
                        <h6>Type</h6>
                    </div>
                    <div className="col-3">
                        <h6>Maintenance</h6>
                    </div>
                </div>
                {aircraftList && aircraftList.map((aircraft:AircraftType)=>(
                    <AircraftListItem key={aircraft.aircraftID} aircraft={aircraft}/>
                ))}
            </div>

        </PageLayout>
    )
}

export default AircraftList;