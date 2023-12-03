import {User} from "../../API/users";
import React from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../Auth/AuthProvider";
import {isAdmin} from "../../Auth/claimUtils";


type Props = {
    userEntry: User
}

const UserListEntry:React.FC<Props> = ({
    userEntry
}) => {

    const { user } = useAuth();
    const { state } = useLocation();
    const navigate = useNavigate();

    const handleEditUser = () =>{
        if(isAdmin(user)){
            navigate(`/User/${userEntry.userID}`)
        } else {
            alert("You do not have permission to edit this user")
        }

    }

    return (

            <div onClick={handleEditUser} className="card p-1 mb-1">
                <div className="row d-flex align-items-center">
                    <div className="col-4">

                        <div className="fw-bold">
                            {userEntry.fName} {userEntry.lName}
                        </div>
                        <div className="text-muted">
                            {userEntry.role}
                        </div>
                        <div className="text-muted">
                            {userEntry.email}
                        </div>

                    </div>
                    <div className="col-4">
                        <div>
                            {userEntry.address}
                        </div>
                        <div>
                            {userEntry.city} {userEntry.province}
                        </div>
                        <div>
                            {userEntry.postal} {userEntry.country}
                        </div>

                    </div>
                    <div className="col-4">
                        {userEntry.phoneNumber}
                    </div>

                </div>
            </div>
    )
}

export default UserListEntry