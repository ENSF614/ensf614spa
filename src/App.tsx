import React from 'react';
import './App.css';

import { Routes, Route} from 'react-router-dom';
import Flights from "./Components/Flights";
import Home from "./Components/Home";
import Booking from "./Components/Booking";
import 'bootstrap/dist/css/bootstrap.css'
import BuyTicket from './Components/BuyTicket';



const App = () => {
  return (
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/Flights" Component={Flights} />
        <Route path="/Booking" Component={Booking} />\
        <Route path="/BuyTicket" Component={BuyTicket} />
      </Routes>

  );
}

export default App;
