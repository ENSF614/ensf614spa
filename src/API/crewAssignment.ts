import {User} from "./users";
import {authorizedGetAsync, authorizedPostAsync} from "./apiUtils";
import CrewAssignment from "../Components/Crew/CrewAssignment";

export type CrewAssignmentType ={
    CrewAssignmentId: number | undefined
    flightID: number
    crewID: number
}


export type AvailableCrew = User & {
    position: string
    crewID: number
}

export const getAvailablePilots = ():Promise<AvailableCrew[]> =>
    authorizedGetAsync<AvailableCrew[]>('http://localhost:8080/api/CrewAssignment/AvailablePilots')

export const getAvailableFas = ():Promise<AvailableCrew[]> =>
    authorizedGetAsync<AvailableCrew[]>('http://localhost:8080/api/CrewAssignment/AvailableFas')

export const createCrewAssignment = (crewAssignment: CrewAssignmentType):Promise<CrewAssignmentType> =>
    authorizedPostAsync<CrewAssignmentType>('http://localhost:8080/api/CrewAssignment/AssignCrew', crewAssignment )

export const deleteCrewAssignment = (crewAssignment: CrewAssignmentType):Promise<void> =>
    authorizedPostAsync<void>('http://localhost:8080/api/CrewAssignment/DeleteCrewAssignment', crewAssignment )