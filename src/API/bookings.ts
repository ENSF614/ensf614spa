import {authorizedGetAsync} from "./apiUtils";

export type Booking = {
    bookingID: number
    userID: number
    flightID: number
    cancelInsurance: boolean
    paid: boolean
    payMethod: string
    seatClass: string
    seatRow: number
    seatCol: string
}

export const getBookingsByFlightID = (accessToken: string, flightID: number):Promise<Booking[]> =>
    authorizedGetAsync<Booking[]>(accessToken, `http://localhost:8080/api/Booking/getBooking/${flightID}`)