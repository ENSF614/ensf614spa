import {authorizedGetAsync} from "./apiUtils";

export type BookedSeats = {
   seatRow: number
   seatCol: string 
}

export enum colLetters {
   A,
   B,
   C,
   D,
   E,
   F,
   G,
   H
}

export const getBookedSeats = (flightID: number):Promise<BookedSeats[]> =>
    authorizedGetAsync<BookedSeats[]>(`http://localhost:8080/api/Booking/getBookedSeats/${flightID}`)