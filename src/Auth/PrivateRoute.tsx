import React from 'react';
import { Route, Navigate, useLocation, RouteProps } from 'react-router-dom';
import { useAuth } from './AuthProvider'; // Adjust the import path
import { hasAnyRole } from './claimUtils';
import {UserRole} from "./authTypes"; // Adjust the import path

type Props = {
    element: React.ReactElement;
    userRoles: UserRole[];
};

const PrivateRoute: React.FC<Props & RouteProps> = ({
        element,
        userRoles,
        ...rest
    }) => {
    const { user } = useAuth();
    const location = useLocation();

    const isLoggedIn = (): boolean => {
        return user !== undefined;
    };

    const isAuthorized = (): boolean => {
        return isLoggedIn() && hasAnyRole(user, userRoles);
    };

    return (
        <Route
            {...rest}
            element={
                isLoggedIn() ? (
                    isAuthorized() ? (
                        element
                    ) : (
                        <h1>Not Authorized</h1>
                    )
                ) : (
                    <Navigate to="/login" state={{ from: location }} replace />
                )
            }
        />
    );
};

export default PrivateRoute;
