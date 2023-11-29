import {UserRole} from "./authTypes";

const PrivateRoute = () =>{


    // Our authorization states.
    const NOT_DETERMINED = 0
    const AUTHORIZED = 1
    const NOT_AUTHORIZED = 2

    // Whether the user is authorized (which will be determined on mount).  Default: Not yet determined.
    let authorizationState = NOT_DETERMINED
    // The allowed roles
    let anyOfRoles: UserRole[] | undefined = undefined

    return(
        <div></div>
    )
}

export default PrivateRoute;