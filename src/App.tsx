import React from 'react';
import './App.css';

import { Routes, Route} from 'react-router-dom';
import Flights from "./Components/Flights";
import Home from "./Components/Home";
import SeatMap from "./Components/SeatMap/SeatMap";
import 'bootstrap/dist/css/bootstrap.css'
import PaymentForm from './Components/Payment/PaymentForm';
import Users from "./Components/User/Users";
import UserEdit from "./Components/User/UserEdit";
import AuthProvider from "./Auth/AuthProvider";
import PrivateRoute from "./Auth/PrivateRoute";
import {UserRoles} from "./Auth/authTypes";



const App = () => {
  return (
      <AuthProvider>
          <Routes>
              <Route path="/" Component={Home} />
              <Route path="/login" Component={Home} />
              <Route path="/Flights" Component={Flights} />
              <Route path="/SeatMap" Component={SeatMap} />
              <Route path="/PaymentForm" Component={PaymentForm} />
              <PrivateRoute path="/Users" element={<Users/>} userRoles={UserRoles.Admin}/>
              <PrivateRoute path="/User/:userId" element={<UserEdit/>} userRoles={UserRoles.UserOrBetter}/>
          </Routes>
      </AuthProvider>


  );
}

export default App;
