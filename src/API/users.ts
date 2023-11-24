import {authorizedGetAsync} from "./apiUtils";

export type User = {
    userID: string
    fName: string
    lName: string
    address: string
    city: string
    province: string
    postalCode: string
    country: string
    phoneNumber: string
    companionPass: boolean
    loungePass: boolean
    role: Role
}

export enum Role {
    Anonoymous,
    User,
    RegisteredUser,
    TravelAgent,
    AirlineEmployee,
    Admin
}


export const getUsers = ():Promise<User[]> =>
    authorizedGetAsync<User[]>('http://localhost:8080/api/User/getUsers')

export const getUser = (userId:string):Promise<User> =>
    authorizedGetAsync<User>( `http://localhost:8080/api/User/getUser/${userId}`)
