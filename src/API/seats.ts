import {authorizedGetAsync} from "./apiUtils";

export type Seat = {
    seatRow: number
    seatCol: string
    booked: boolean
    flightID: number
    businessClass: boolean
    price: number
}

export const getSeats = (flightID: number):Promise<Seat[]> =>
    authorizedGetAsync<Seat[]>(`http://localhost:8080/api/Booking/getFlightSeats/${flightID}`)