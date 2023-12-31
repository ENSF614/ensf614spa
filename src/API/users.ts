import {authorizedGetAsync, authorizedPostAsync, authorizedPutAsync} from "./apiUtils";
import {UserRole} from "../Auth/authTypes";

export type User = {
    userID: string
    fName: string
    lName: string
    email: string
    password: string
    rewardsMember: boolean
    address: string
    city: string
    province: string
    postal: string
    country: string
    phoneNumber: string
    companionPass: boolean
    loungePass: boolean
    joinedOnDate: Date | null
    role: UserRole
}

export type NewUser = User & {
    password: string

}

export type AssignedUser = User & {
    position: string
    flightId: number
    crewAssignmentId: number
}

export type SignIn = {
    email: string
    password: string
}



export const getUsers = ():Promise<User[]> =>
    authorizedGetAsync<User[]>('http://localhost:8080/api/User/getUsers')

export const getUser = (userId:string):Promise<User> =>
    authorizedGetAsync<User>( `http://localhost:8080/api/User/getUser/${userId}`)

export const createUser = (newUser:NewUser):Promise<User> =>
    authorizedPostAsync<User>( `http://localhost:8080/api/User/newUser`, newUser)

export const signInUser = (signInDetail:SignIn):Promise<User> =>
    authorizedPostAsync<User>( `http://localhost:8080/api/User/login`, signInDetail)

export const updateUser = (user:User):Promise<User> =>
    authorizedPutAsync<User>( `http://localhost:8080/api/User/updateUser`, user)