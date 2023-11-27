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



const App = () => {
  return (
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/Flights" Component={Flights} />
        <Route path="/SeatMap" Component={SeatMap} />
        <Route path="/PaymentForm" Component={PaymentForm} />
        <Route path="/Users" Component={Users}/>
        <Route path="/User/:userId" Component={UserEdit}/>
      </Routes>

  );
}

export default App;
