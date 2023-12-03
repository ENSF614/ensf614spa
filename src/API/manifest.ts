import {Flight} from "./flights";
import {authorizedGetAsync} from "./apiUtils";
import {Booking} from "./booking";
import {User} from "./users";

export type FlightManifest = {
    flight: Flight
    capacity: number
    booked: number
    bookings: Booking[]
    aircraft: Aircraft
    pilots: User[]
    flightAttendants: User[]
}

export type Aircraft = {
    aircraftID: number,
    rowNums: number,
    colNums: number,
    capacity: number,
    name: string,
    type: string,
    pilotNum: number,
    crewNum: number,
    cycles: number,
    hours: number,
    numBusinessRows: number,
}


export const getManifests = ():Promise<FlightManifest[]> =>
    authorizedGetAsync<FlightManifest[]>('http://localhost:8080/api/Manifest/getManifests')

export const getManifestByFlight = (flightId: number):Promise<FlightManifest> =>
    authorizedGetAsync<FlightManifest>(`http://localhost:8080/api/Manifest/getManifest/${flightId}`)
