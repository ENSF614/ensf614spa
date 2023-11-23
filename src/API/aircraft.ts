import {authorizedGetAsync} from "./apiUtils";

export type Aircraft = {
    aircraftID: number
    rows: number
    cols: number
    capacity: number
    name: string
    type: string
    crewNum: number
    numBusinessSeats: number
}

export const getAircraftByID = (accessToken: string, id: number):Promise<Aircraft> =>
    authorizedGetAsync<Aircraft>(accessToken, `http://localhost:8080/api/Booking/getAircraft/${id}`)