import {User} from "../../API/users";
import UserListEntry from "../User/UserListEntry";
import PageLayout from "../Layout/PageLayout";
import {useEffect, useState} from "react";
import {FlightManifest, getManifestByFlight} from "../../API/manifest";
import {Booking} from "../../API/booking";
import Passenger from "./Passenger";
import {useParams} from "react-router-dom";



const PassengerManifest = () => {

    const {flightId} = useParams<string>()

    const [manifest, setManifest] = useState<FlightManifest | undefined>()

    useEffect(()=>{
        getManifestByFlight(flightId as unknown as number)
            .then((response) => {
                setManifest(response)
                console.dir(response)
            }).catch(error =>{
                console.log(error)
            })

    }, [])

    return (
        <PageLayout>
            <div className="container">
                <div className="row mt-5 px-1">
                    <div className="col-4">
                        <h6>Name</h6>
                    </div>
                    <div className="col-4">
                        <h6>Seat</h6>
                    </div>
                    <div className="col-4">
                        <h6>Class</h6>
                    </div>
                </div>
                {manifest && manifest.bookings && manifest.bookings.map((booking:Booking)=>(
                    <Passenger key={booking.bookingID} passenger={booking}/>
                ))}
            </div>

        </PageLayout>
    );
}

export default PassengerManifest;