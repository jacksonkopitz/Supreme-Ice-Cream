import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './Login';
import Homepage from './Homepage';

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
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route path="/home">
            <Homepage />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}