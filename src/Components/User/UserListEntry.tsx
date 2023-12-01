import {User} from "../../API/users";
import React from "react";
import {Link} from "react-router-dom";


type Props = {
    user: User
}

const UserListEntry:React.FC<Props> = ({
    user
}) => {

    console.dir(user)


    return (
        <div className="card p-1 mb-1">
            <div className="row d-flex align-items-center">
                <div className="col">

                        <div className="fw-bold">
                            {user.fName} {user.lName}
                        </div>
                        <div className="text-muted">
                            {user.role}
                        </div>

                </div>
                <div className="col">
                    EmailHolder
                </div>
                <div className="col">
                    <div>
                        {user.address}
                    </div>
                    <div>
                        {user.city}, {user.province}
                    </div>
                    <div>
                        {user.postal}, {user.country}
                    </div>

                </div>
                <div className="col">
                    {user.phoneNumber}
                </div>
                <div className="col-1">
                    {user.companionPass ? "Yes" : "No"}
                </div>
                <div className="col-1">
                    {user.loungePass ? "Yes" : "No"}
                </div>
                <div className="col-1 fw-bold">
                    <Link to={`/User/${user.userID}`}>
                    Edit {user.userID}
                    </Link>
                </div>

            </div>
        </div>

    )
}

export default UserListEntry