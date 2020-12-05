import React, { useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './Login';
import Homepage, { Flavor, FlavorWithID } from './Homepage';
import axios from 'axios';


// type Flavor = {
//   readonly name: string;
//   readonly qty: number
// }

// type FlavorWithID = Flavor & {
//   readonly id: string;
// }


export default function App() {

  return (
    <Router>
      <div>
        <ul className="list">
          <li className="item">
            <Link className="link" to="/home">Home</Link>
          </li>
          <li className="item">
            <Link className="link" to="/login">Log In</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/home">
            <Homepage />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="">
            <Homepage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}