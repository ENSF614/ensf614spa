import PageLayout from "../Layout/PageLayout";
import {useEffect, useState} from "react";
import {FlightManifest, getManifestByFlight} from "../../API/manifest";
import {useParams} from "react-router-dom";
import CrewList from "./CrewList";




const CrewAssignment = () => {

    const {flightId} = useParams<string>()

    const [manifest, setManifest] = useState<FlightManifest | undefined>()


    useEffect(()=>{
        loadManifest()
    },[])

    const loadManifest = () => {
        getManifestByFlight(flightId as unknown as number)
            .then((response) => {
                setManifest(response)
                console.dir(response)
            }).catch(error =>{
            console.log(error)
        })
    }

    return (
        <PageLayout>
            <div className="container">
                <div className="row mt-5 px-1">
                    <div className="col-6">
                        <h6>Pilots</h6>
                    </div>
                    <div className="col-6">
                        <h6>Flight Attendants</h6>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <CrewList
                            crew={manifest ? manifest.pilots : []}
                            crewType='pilot'
                            crewRequired={manifest ? manifest.aircraft.pilotNum: 0}
                            flightId={manifest ? manifest.flight.flightId : 0}
                            loadManifest = {loadManifest}
                        />
                    </div>
                    <div className="col-6">
                        <CrewList
                            crew={manifest ? manifest.flightAttendants : []}
                            crewType='flight attendant'
                            crewRequired={manifest ? manifest.aircraft.crewNum: 0}
                            flightId={manifest ? manifest.flight.flightId : 0}
                            loadManifest = {loadManifest}
                        />
                    </div>
                </div>
            </div>

        </PageLayout>
    );
}

export default CrewAssignment;