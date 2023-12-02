import {authorizedGetAsync} from "./apiUtils";

export type Flight = {
    flightId: number
    flightNo: string
    origin: string
    destination: string
    departureDateTime: Date
    arrivalDateTime: Date
    aircraftID: number
    coachSeatPrice: number
    businessSeatPrice: number
}

export type UserFlightInfo = {
    bookingID: number
    flightID: number
    cancelInsurance: boolean
    seatClass: string
    seatRow: number
    seatCol: string
    passengerName: string
    flightNumber: string
    origin: string
    destination: string
    departureDateTime: Date
    arrivalDateTime: Date
}


export const getFlights = ():Promise<Flight[]> =>
    authorizedGetAsync<Flight[]>('http://localhost:8080/api/Flight/getFlights')

export const getUserFlightInfo = (userID: string):Promise<UserFlightInfo[]> =>
    authorizedGetAsync<UserFlightInfo[]>(`http://localhost:8080/api/Flight/getFlights/${userID}`)
