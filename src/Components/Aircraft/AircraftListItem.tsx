import {Booking} from "../../API/booking";
import {AircraftType} from "../../API/aircraft";
import {useNavigate} from "react-router-dom";


type Props = {
    aircraft: AircraftType
}

const AircraftListItem:React.FC<Props> = ({
    aircraft
                                  }) =>{

    const navigate = useNavigate();

    return(
        <div className="card p-1 mb-1">
            <div  className="row mt-1 px-1">
                <div className="col-3">
                    <p>{aircraft.aircraftID}</p>
                </div>
                <div className="col-3">
                    <p>{aircraft.type}</p>
                </div>
                <div className="col-3">
                    <p>{aircraft.name}</p>
                </div>
                <div className="col-3">
                    <i onClick={() => navigate(`/Aircraft/${aircraft.aircraftID}`)} className='bx bx-wrench bx-lg'></i>
                </div>
            </div>
        </div>

    )

}

export default AircraftListItem;