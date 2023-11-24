import PageLayout from "../PageLayout";
import {getUsers, User} from "../../API/users";
import {useEffect, useState} from "react";
import UserListEntry from "./UserListEntry";




const Users = () =>{

    const [users, setUsers] = useState<User[]>([])

    const loadUsers = () => {
        getUsers()
            .then((response) => {
                console.log(response)
                setUsers(response)
            })
            .catch(error =>{
                console.log(error)
            })
    }

    useEffect(()=>{
        loadUsers()
    }, [])


    return(
        <PageLayout>
            <div className="container">
                <div className="row mt-5 px-1">
                    <div className="col">
                        <h6>Name</h6>
                    </div>
                    <div className="col">
                        <h6>Email</h6>
                    </div>
                    <div className="col">
                        <h6>Address</h6>
                    </div>
                    <div className="col">
                        <h6>Phone</h6>
                    </div>
                    <div className="col-1">
                        <h6>Companion Pass</h6>
                    </div>
                    <div className="col-1">
                        <h6>Lounge Pass</h6>
                    </div>
                    <div className="col-1">
                        <h6>Actions</h6>
                    </div>
                </div>
                {users && users.map((user:User)=>(
                    <UserListEntry user={user}/>
                ))}
            </div>

        </PageLayout>
    )
}

export default Users;