import PageLayout from "../Layout/PageLayout";
import {getUsers, User} from "../../API/users";
import {useEffect, useState} from "react";
import UserListEntry from "./UserListEntry";




const Users = () =>{

    const [users, setUsers] = useState<User[]>([])

    const loadUsers = () => {
        getUsers()
            .then((response) => {
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
                    <div className="col-4">
                        <h6>Name</h6>
                    </div>
                    <div className="col-4">
                        <h6>Address</h6>
                    </div>
                    <div className="col-4">
                        <h6>Phone</h6>
                    </div>
                </div>
                {users && users.map((user:User)=>(
                    <UserListEntry key={user.userID} userEntry={user}/>
                ))}
            </div>

        </PageLayout>
    )
}

export default Users;