import {authorizedGetAsync} from "./apiUtils";
import {FlightManifest} from "./manifest";

export type AircraftType = {
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

export const getAircraft = ():Promise<AircraftType[]> =>
    authorizedGetAsync<AircraftType[]>('http://localhost:8080/api/Aircraft/getAircraft')
export const getAircraftByAircraftId = (aircraftId:string):Promise<AircraftType> =>
    authorizedGetAsync<AircraftType>(`http://localhost:8080/api/Aircraft/getAircraft/${aircraftId}`)
