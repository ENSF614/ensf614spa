import {ClaimType, UserRole, UserRoles} from './authTypes';
import {User} from "../API/users";


/**
 * Transforms Unix timestamp to date and returns a string value of that date
 * @param {String} date Unix timestamp
 * @returns
 */
const changeDateFormat = (date: number) => {
    const dateObj = new Date(date * 1000);
    return `${date} - [${dateObj.toString()}]`;
};

/**
 * Returns whether or not the user has the given value for the given claim.
 * @param user The user.
 * @param claimType The claim type.
 * @param claimValue The claim value.
 */
export const hasClaim = (user: User | undefined, claimType: ClaimType, claimValue: string): boolean => {
    // If the user and profile exist...
    if (user && user[claimType]) {
        // Get the claim value
        const value = user[claimType] as string
        // If the value is actually an array of values...
        if (Array.isArray(value)) {
            // Return true if the array contains the value of interest.
            return 0 <= value.indexOf(claimValue)
        }
        // The claim values are not an array so there is only one value to check
        return value === claimValue
    }
    // Return false if the user or profile do not exist
    return false
}

/**
 * Returns whether or no the user has any of the given values for the given claim.
 * @param user The user.
 * @param claimType The claim type.
 * @param claimValues The claim values.
 */
export const hasAnyClaim = (user: User | undefined, claimType: ClaimType, claimValues: string[]): boolean => {
    if (user) {
        // For each claim value in the list...
        for (const claimValue of claimValues) {
            // If the value is found
            if (hasClaim(user, claimType, claimValue)) {
                // return true
                return true
            }
            // Otherwise, check the next one.
        }
    }
    // No matching values found, return false
    return false
}


/**
 * Returns whether or not the user has any of the specific roles.
 * @param user
 * @param roles
 */
export const hasAnyRole = (user: User | undefined, roles: UserRole[]): boolean => hasAnyClaim(user, ClaimType.role, roles)



/**
 * Returns whether or not the user is authorized given the roles, company types, and user types required.
 * @param user
 * @param anyOfRoles If given, the list of roles that the user must have at least one of.
 */
export const isAuthorized = (
    user: User | undefined,
    anyOfRoles: UserRole[] | undefined,
): boolean => {
    return (
        (undefined === anyOfRoles || hasAnyRole(user, anyOfRoles))
    )
}

/**
 * Returns true if the user has admin level clearance.
 * @param user The user.
 */
export const isAdminOrBetter = (user: User | undefined): boolean => hasAnyRole(user, UserRoles.Admin)


/**
 * Returns true if the user has staff user level clearance.
 * @param user The user.
 */
export const isStaffOrBetter= (user: User | undefined): boolean => hasAnyRole(user, UserRoles.StaffOrBetter)

/**
 * Returns true if the user has travel agent level clearance.
 * @param user The user.
 */
export const isTravelAgentOrBetter= (user: User | undefined): boolean => hasAnyRole(user, UserRoles.TravelAgentOrBetter)

/**
 * Returns true if the user has registered user level clearance.
 * @param user The user.
 */
export const isRegisteredUserOrBetter= (user: User | undefined): boolean => hasAnyRole(user, UserRoles.RegisteredUserOrBetter)

/**
 * Returns true if the user has user level clearance.
 * @param user The user.
 */
export const isUserOrBetter = (user: User | undefined): boolean => hasAnyRole(user, UserRoles.UserOrBetter)



/**
 * Returns true if the user is an admin
 * @param user The user.
 */
export const isAdmin = (user: User | undefined): boolean => hasClaim(user, ClaimType.role, UserRole.Admin)

/**
 * Returns true if the user is staff
 * @param user The user.
 */
export const isStaff = (user: User | undefined): boolean => hasClaim(user, ClaimType.role, UserRole.Staff)

/**
 * Returns true if the user is a travel agent
 * @param user The user.
 */
export const isTravelAgent = (user: User | undefined): boolean => hasClaim(user, ClaimType.role, UserRole.TravelAgent)

/**
 * Returns true if the user is a registered user
 * @param user The user.
 */
export const isRegisteredUser = (user: User | undefined): boolean => hasClaim(user, ClaimType.role, UserRole.RegisteredUser)

/**
 * Returns true if the user is a basic User
 * @param user The user.
 */
export const isUser = (user: User | undefined): boolean => hasClaim(user, ClaimType.role, UserRole.User)


