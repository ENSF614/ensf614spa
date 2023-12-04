// Claim types
import {User} from "../API/users";

export enum ClaimType {
    role = 'role',
}



// Possible User Roles
export enum UserRole {

    Admin = 'Admin',
    Staff = 'Staff',
    TravelAgent = 'TravelAgent',
    RegisteredUser = 'RegisteredUser',
    User = 'User',
}




// Groups of user roles.
export class UserRoles {


    static readonly Admin = [UserRole.Admin]
    static readonly StaffOrBetter = [UserRole.Admin, UserRole.Staff]
    static readonly TravelAgentOrBetter = [UserRole.Admin, UserRole.Staff, UserRole.TravelAgent]
    static readonly RegisteredUserOrBetter = [UserRole.Admin, UserRole.Staff, UserRole.TravelAgent, UserRole.RegisteredUser]
    static readonly UserOrBetter = [UserRole.Admin, UserRole.Staff, UserRole.TravelAgent, UserRole.RegisteredUser, UserRole.User]
}
