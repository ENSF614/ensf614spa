import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {AircraftType, getAircraft, getAircraftByAircraftId} from "../../API/aircraft";
import PageLayout from "../Layout/PageLayout";


const AircraftDetail = () => {

    const {aircraftId} = useParams<{aircraftId: string}>();

    const [aircraft, setAircraft] = useState<AircraftType | undefined>()



    useEffect(()=>{
        getAircraftByAircraftId(aircraftId as string)
            .then((response) => {
                setAircraft(response)
                console.dir(response)
            }).catch(error =>{
            console.log(error)
        })

    }, [])

    return (
        <PageLayout>
            <div className="card mt-5">
                <div className="card-header">
                    <h4>
                        Tail Number: {aircraft?.aircraftID}
                    </h4>
                    <div className="mt-2">
                        {aircraft?.type} {aircraft?.name}
                    </div>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-4">
                            <div>
                                <h6 className="mb-4">Aircraft Specifications</h6>
                            </div>
                            <div>
                                <p>Passenger Capacity: {aircraft?.capacity}</p>
                                <p>Flight Crew Requirement: {aircraft?.pilotNum}</p>
                                <p>Cabin Crew Requirement: {aircraft?.crewNum}</p>
                            </div>
                        </div>
                        <div className="col-4">
                            <div>
                                <h6 className="mb-4">Current Utilization</h6>
                            </div>
                            <div>
                                <p>Flight Cycles: {aircraft?.cycles}</p>
                                <p>Flight Hours: {aircraft?.hours}</p>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="mb-4">
                                <h6 className="mb-4">Maintenance</h6>
                            </div>
                            <div>
                                <p>Next Cycle Based Maintenance: {aircraft ? aircraft.cycles % 100 : "N/A"}</p>
                                <p>Next Hour Based Maintenance: {aircraft ? (aircraft.hours % 500).toFixed(2) : 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </PageLayout>

    )
}

export default AircraftDetail;