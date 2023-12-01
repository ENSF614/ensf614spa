import {authorizedPutAsync} from "./apiUtils";

export type Booking = {
    bookingID?: number
    userID: string
    flightID: number
    cancelInsurance: boolean
    paid: boolean
    payMethod: string
    seatClass: string
    seatRow: number
    seatCol: string
    passengerName: string
}

export const putBooking = (message: Booking): Promise<boolean> => 
    authorizedPutAsync<boolean>('http://localhost:8080/api/Booking/putBooking', message)

export const putBookings = (message: Booking[]): Promise<boolean> => 
    authorizedPutAsync<boolean>('http://localhost:8080/api/Booking/putBookings', message)    