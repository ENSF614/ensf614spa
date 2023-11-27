import {authorizedPutAsync} from "./apiUtils";

export type Booking = {
    bookingID?: number
    userID: number
    flightID: number
    cancelInsurance: boolean
    paid: boolean
    payMethod: string
    seatClass: string
    seatRow: number
    seatCol: string
}

export const putBooking = (message: Booking): Promise<boolean> => 
    authorizedPutAsync<boolean>('http://localhost:8080/api/Booking/putBooking', message)