import {User} from "../../API/users";
import React from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../Auth/AuthProvider";
import {isAdmin} from "../../Auth/claimUtils";
import {FlightManifest} from "../../API/manifest";
import {Flight} from "../../API/flights";


type Props = {
    flight: Flight
}

const FlightInfo:React.FC<Props> = ({
                                           flight
                                       }) => {

    const { user } = useAuth();
    const { state } = useLocation();
    const navigate = useNavigate();

    const handleEditUser = () =>{
        if(isAdmin(user)){
            // navigate(`/Manifest/${userEntry.userID}`)
            navigate(`/Manifest`)
        } else {
            alert("You do not have permission to edit this user")
        }

    }

    return (

        <div className="card p-1 mb-1">
            <div className="row d-flex align-items-center">
                <div className="col-6">

                    <div className="fw-bold">
                        {flight.flightNo}
                    </div>
                    <div className="text-muted">
                        {flight.origin} to {flight.destination}
                    </div>
                    <div className="text-muted">
                        {new Date(flight.departureDateTime).toLocaleDateString()}
                    </div>

                </div>
                <div className="col-2">
                    <i onClick={() => navigate('/Aircraft')} className='bx bxs-plane bx-lg'></i>
                </div>
                <div className="col-2">
                    <i onClick={() => navigate(`/PassengerManifest/${flight.flightId}`)} className='bx bx-male-female bx-lg'></i>
                </div>
                <div className="col-2">
                    <i className='bx bx-group bx-lg'></i>
                </div>

            </div>
        </div>
    )
}
export default FlightInfo;