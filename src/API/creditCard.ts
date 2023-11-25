import {authorizedGetAsync, authorizedPostAsync} from "./apiUtils";

export type CreditCard = {
    cardNumber: string | undefined
    cardExpiry: string | undefined
    cardCVV: string | undefined
}

const card: CreditCard = {
    cardNumber: "1",
    cardExpiry: "1",
    cardCVV: "1"
}

console.log(card)

export const checkCard = (message: CreditCard):Promise<boolean> =>
    authorizedPostAsync<boolean>('http://localhost:8080/api/Booking/validateCard', message)