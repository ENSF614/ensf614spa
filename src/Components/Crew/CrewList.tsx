import {Booking} from "../../API/booking";
import {AssignedUser} from "../../API/users";
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import {useEffect, useState} from "react";
import {
    AvailableCrew,
    CrewAssignmentType,
    getAvailableFas,
    getAvailablePilots,
    createCrewAssignment,
    deleteCrewAssignment
} from "../../API/crewAssignment";


type Props = {
    crew: AssignedUser[]
    crewType: String
    crewRequired:number
    flightId:number
    loadManifest: ()=>void
}

const CrewList:React.FC<Props> = ({
    crew,
    crewType,
    crewRequired,
    flightId,
    loadManifest
                                        }:Props) => {

    const [availableCrew, setAvailableCrew] = useState<AvailableCrew[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [selectedCrew, setSelectedCrew] = useState<AvailableCrew | undefined>();

    useEffect(()=>{

        if(crewType === 'pilot'){
            getAvailablePilots()
                .then(response => setAvailableCrew(response))
                .catch(error => {
                    console.log(error)
                })
        } else {
            getAvailableFas()
                .then(response => setAvailableCrew(response))
                .catch(error => {
                    console.log(error)
                })
        }
    },[])

    const handleAddCrewAssignment = (crew:AvailableCrew) => {
        console.dir(crew)
        if(crew){
            var newCrewAssignment = {
                flightID: flightId,
                crewID: crew.crewID
            } as CrewAssignmentType
            console.dir(newCrewAssignment)
            createCrewAssignment(newCrewAssignment)
                .then(()=>{
                    loadManifest();
                }).catch((error: any) => {
                    console.log(error)
            })
        }
    }

    const handleDeleteCrewAssignment = (assignedUser: AssignedUser)=>{
        console.log("deleting")
        console.dir(assignedUser)
        const newCrewAssignment = {
            CrewAssignmentId: assignedUser.crewAssignmentId as number,
            flightID: flightId,
            crewID: availableCrew.find(x => x.userID === assignedUser.userID)?.crewID
        } as CrewAssignmentType;
        console.dir(newCrewAssignment)
        deleteCrewAssignment(newCrewAssignment)
            .then(()=> {
                loadManifest()
            }).catch((error:any)=>{
                console.log(error)
        })
    }

    return(
        <div className="card mt-1">
            <div className="card-header">
                <div className="row">
                    <div className="col-8">
                        <h6>Required: {crewRequired}</h6>
                        <h6>Assigned: {crew.length}</h6>
                    </div>
                    <div className="col-2">
                        <Dropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen(!dropdownOpen)}>
                            <DropdownToggle caret>
                                Select Crew
                            </DropdownToggle>
                            <DropdownMenu>
                                {availableCrew.map((crew:AvailableCrew) => (
                                    <DropdownItem key={crew.crewID} onClick={() => handleAddCrewAssignment(crew)}>
                                        {crew.fName} {crew.lName}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    {/*<div className="col-3">*/}
                    {/*    <i className='bx bx-user-plus bx-lg text-success'></i>*/}
                    {/*</div>*/}
                </div>

            </div>
            <div className="card-body">
                {crew.length > 0 && crew.map((crewMember:AssignedUser) => (
                    <div className="row">
                        <div className="col-10">
                            <p>{crewMember.fName} {crewMember.lName}</p>
                        </div>
                        <div className="col-2">
                            <i onClick={() => handleDeleteCrewAssignment(crewMember)} className='bx bx-user-minus bx-sm text-danger'></i>
                        </div>

                    </div>

                ))}
            </div>
        </div>
    )
}

export default CrewList