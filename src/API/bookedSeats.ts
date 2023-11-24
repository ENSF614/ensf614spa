import {authorizedGetAsync} from "./apiUtils";

export type BookedSeats = {
   seatRow: number
   seatCol: string 
}

export const getBookedSeats = (accessToken: string, flightID: number):Promise<BookedSeats[]> =>
    authorizedGetAsync<BookedSeats[]>(accessToken, `http://localhost:8080/api/Booking/getBookedSeats/${flightID}`)