import React, {createContext, useState, useEffect, SetStateAction, Dispatch, useCallback, useContext} from 'react';
import {User} from "../API/users";

// Create the context

export type AuthContextType = {
    login: ()=> Promise<void>
    logout: ()=> Promise<void>
    user: User | undefined
}

export const AuthContext = createContext<AuthContextType|undefined>(undefined)

type Props = {
    children: React.ReactNode
}

const AuthProvider:React.FC<Props> = ({children}:Props) => {

    const [user, setUser] = useState<User|undefined>(undefined)

    const login = useCallback(async () => {
        // have login logic here
    },[])

    const logout = useCallback(async () => {
        // have login logic here
    },[])




    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
        )
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default AuthProvider;