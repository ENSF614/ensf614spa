import React from 'react';
import './App.css';

import { Routes, Route} from 'react-router-dom';
import Flights from "./Components/Flights";
import Home from "./Components/Home";
import 'bootstrap/dist/css/bootstrap.css'



const App = () => {
  return (
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/Flights" Component={Flights} />
      </Routes>

  );
}

export default App;
