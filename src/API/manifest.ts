import {Flight} from "./flights";
import {authorizedGetAsync} from "./apiUtils";
import {Booking} from "./booking";
import {AssignedUser, User} from "./users";
import {AircraftType} from "./aircraft";

export type FlightManifest = {
    flight: Flight
    capacity: number
    booked: number
    bookings: Booking[]
    aircraft: AircraftType
    pilots: AssignedUser[]
    flightAttendants: AssignedUser[]
}




export const getManifests = ():Promise<FlightManifest[]> =>
    authorizedGetAsync<FlightManifest[]>('http://localhost:8080/api/Manifest/getManifests')

export const getManifestByFlight = (flightId: number):Promise<FlightManifest> =>
    authorizedGetAsync<FlightManifest>(`http://localhost:8080/api/Manifest/getManifest/${flightId}`)
