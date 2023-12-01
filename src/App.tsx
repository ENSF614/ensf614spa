import React, {ComponentType} from 'react';
import './App.css';

import {Route, Routes} from 'react-router-dom';
import Flights from "./Components/Flights";
import Home from "./Components/Home";
import SeatMap from "./Components/SeatMap/SeatMap";
import 'bootstrap/dist/css/bootstrap.css'
import PaymentForm from './Components/Payment/PaymentForm';
import Users from "./Components/User/Users";
import UserEdit from "./Components/User/UserEdit";
import AuthProvider, {useAuth} from "./Auth/AuthProvider";
import {UserRole, UserRoles} from "./Auth/authTypes";
import LogIn from "./Components/Auth/LogIn";
import * as claimUtils from "./Auth/claimUtils";
import SignUp from "./Components/User/SignUp";


/**
 * Tests that a component has the given roles and ads the layout properties to it.
 * @param roles The list of roles.
 * @param Component The wrapped component.
 * @returns
 */
const withAuthorization = (roles: UserRole[], Component: ComponentType) => {
    return () => {

        const {user} = useAuth();
        const isLoggedIn = (): boolean => {
            return user !== undefined;
        };

        const isAuthorized = (): boolean => {
            return isLoggedIn() && claimUtils.hasAnyRole(user, roles);
        };

        return (isLoggedIn()) ? (isAuthorized() ? <Component/> : <h1>Not Authorized</h1>) : <LogIn/>;
    }
}

const adminOrBetter = (Component: ComponentType) => withAuthorization(UserRoles.Admin,  Component)
const staffOrBetter = (Component: ComponentType) => withAuthorization(UserRoles.StaffOrBetter,  Component)
const travelAgentOrBetter = (Component: ComponentType) => withAuthorization(UserRoles.TravelAgentOrBetter,  Component)
const registeredUserOrBetter = (Component: ComponentType) => withAuthorization(UserRoles.RegisteredUserOrBetter,  Component)
const userOrBetter = (Component: ComponentType) => withAuthorization(UserRoles.UserOrBetter,  Component)




const App = () => {
  return (
      <AuthProvider>
          <Routes>
              <Route path="/" Component={Home} />
              <Route path="/login" Component={LogIn} />
              <Route path="/signup" Component={SignUp} />
              <Route path="/Flights" Component={Flights} />
              <Route path="/SeatMap" Component={SeatMap} />
              <Route path="/PaymentForm" Component={PaymentForm} />
              <Route path="/Users" Component={adminOrBetter(Users)} />
              <Route path="/User/:userId" Component={userOrBetter(UserEdit)} />
              <Route path="/work" Component={SignUp} />
          </Routes>
      </AuthProvider>


  );
}

export default App;
