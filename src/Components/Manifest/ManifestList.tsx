// import PageLayout from "../Layout/PageLayout";
// import {getUsers, User} from "../../API/users";
// import {useEffect, useState} from "react";
// import UserListEntry from "./UserListEntry";
// import {FlightManifest} from "../../API/manifest";
//
//
//
//
// const Users = () =>{
//
//     const [flightManifests, setFlightManifests] = useState<FlightManifest[]>([])
//
//     const loadFlights = () => {
//         getUsers()
//             .then((response) => {
//                 setFlightManifests(response)
//             })
//             .catch(error =>{
//                 console.log(error)
//             })
//     }
//
//     useEffect(()=>{
//         loadFlights()
//     }, [])
//
//
//     return(
//         <PageLayout>
//             <div className="container">
//                 <div className="row mt-5 px-1">
//                     <div className="col-4">
//                         <h6>Name</h6>
//                     </div>
//                     <div className="col-4">
//                         <h6>Address</h6>
//                     </div>
//                     <div className="col-4">
//                         <h6>Phone</h6>
//                     </div>
//                 </div>
//                 {users && users.map((user:User)=>(
//                     <UserListEntry key={user.userID} userEntry={user}/>
//                 ))}
//             </div>
//
//         </PageLayout>
//     )
// }
//
// export default Users;