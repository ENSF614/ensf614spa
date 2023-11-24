import {authorizedGetAsync} from "./apiUtils";

export type BookingInfo = {
    coachSeatPrice: number
    businessSeatPrice: number
    numBusinessSeats: number
    numRows: number
    numCols: number
}

export const getBookingInfo = (accesToken: string, flightID: number):Promise<BookingInfo> =>
    authorizedGetAsync<BookingInfo>(accesToken, `http://localhost:8080/api/Booking/getBookingInfo/${flightID}`)