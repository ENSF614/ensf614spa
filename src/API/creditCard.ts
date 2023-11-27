import {authorizedGetAsync, authorizedPostAsync} from "./apiUtils";

export type CreditCard = {
    cardNumber: string | undefined
    cardExpiry: string | undefined
    cardCVV: string | undefined
}

export const checkCard = (message: CreditCard):Promise<boolean> =>
    authorizedPostAsync<boolean>('http://localhost:8080/api/Booking/validateCard', message)