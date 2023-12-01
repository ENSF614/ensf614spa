import React, {createContext, useState, useEffect, SetStateAction, Dispatch, useCallback, useContext} from 'react';
import {SignIn, signInUser, User} from "../API/users";
import { useNavigate } from 'react-router-dom';

// Create the context

export type AuthContextType = {
    login: (signInDetail:SignIn)=> Promise<void>
    logout: ()=> Promise<void>
    user: User | undefined
}

export const AuthContext = createContext<AuthContextType|undefined>(undefined)

type Props = {
    children: React.ReactNode
}

const AuthProvider:React.FC<Props> = ({children}:Props) => {
    const navigate = useNavigate();

    const [user, setUser] = useState<User|undefined>(undefined)

    // Load initial data from storage when the app loads
    useEffect(() => {
        const data = localStorage.getItem('fakeAirlineUserData');
        if (data && data !== 'undefined') {
            setUser(JSON.parse(data));
        }
    }, []);

    // Save to local storage when userData changes
    useEffect(() => {
        if(user){
            localStorage.setItem('fakeAirlineUserData', JSON.stringify(user as User))
        }

    }, [user]);

    const login = useCallback(async (signInDetail:SignIn):Promise<void> => {
        // have login logic here
        if(signInDetail){
            signInUser(signInDetail)
                .then((user:User) => {
                    setUser(user)
                    console.dir(user)
                })
                .catch((error) => {
                    console.log(error)
                    alert("Invalid username or password")
                })

        }
    },[])

    const logout = useCallback(async () => {
        setUser(undefined)
        localStorage.setItem('fakeAirlineUserData', JSON.stringify(undefined))
        navigate('/')
    },[navigate])




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