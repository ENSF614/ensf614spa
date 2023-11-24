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


export const getFlights = (accessToken: string):Promise<Flight[]> =>
    authorizedGetAsync<Flight[]>(accessToken, 'http://localhost:8080/api/Flight/getFlights')
