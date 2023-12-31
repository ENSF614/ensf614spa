import {authorizedPostAsync, authorizedPutAsync} from "./apiUtils";

export type Booking = {
    bookingID?: number
    userID: string
    flightID: number
    cancelInsurance: boolean
    paid: number
    payMethod: string
    seatClass: string
    seatRow: number
    seatCol: string
    passengerName: string
}

export type Cancel = {
    bookingID: number
    userID: string
    flightID: number
    cancelInsurance: boolean
}

export const putBooking = (message: Booking): Promise<boolean> => 
    authorizedPutAsync<boolean>('http://localhost:8080/api/Booking/putBooking', message)

export const putBookings = (message: Booking[]): Promise<string> => 
    authorizedPutAsync<string>('http://localhost:8080/api/Booking/putBookings', message)
    
export const cancelBooking = (cancel: Cancel): Promise<string> =>
    authorizedPostAsync<string>(`http://localhost:8080/api/Booking/cancelBooking`, cancel)