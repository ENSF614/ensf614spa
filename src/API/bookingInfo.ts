import {authorizedGetAsync} from "./apiUtils";

export type BookingInfo = {
    coachSeatPrice: number
    businessSeatPrice: number
    numBusinessSeats: number
    numRows: number
    numCols: number
}

export const getBookingInfo = (flightID: number):Promise<BookingInfo> =>
    authorizedGetAsync<BookingInfo>(`http://localhost:8080/api/Booking/getBookingInfo/${flightID}`)