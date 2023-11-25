import React from 'react';
import './App.css';

import { Routes, Route} from 'react-router-dom';
import Flights from "./Components/Flights";
import Home from "./Components/Home";
import Booking from "./Components/Booking/Booking";
import 'bootstrap/dist/css/bootstrap.css'
import BuyTicket from './Components/Booking/BuyTicket';
import Users from "./Components/User/Users";
import UserEdit from "./Components/User/UserEdit";



const App = () => {
  return (
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/Flights" Component={Flights} />
        <Route path="/Booking" Component={Booking} />
        <Route path="/BuyTicket" Component={BuyTicket} />
        <Route path="/Users" Component={Users}/>
        <Route path="/User/:userId" Component={UserEdit}/>
      </Routes>

  );
}

export default App;
