import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from '../components/SubComponents/Header';
import CreateWallet from '../components/CreateWallet/CreateWallet';
import AccessMyWallet from '../components/AccessMyWallet/AccessMyWallet';
import Intro from '../components/Introdution/Intro';

export default function Navigation() {
    return (
      <Router>
        <div>
  
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/login">
                <Header/>
                <AccessMyWallet/> 
            </Route>
            <Route path="/">
                <Header/>
                <AccessMyWallet/> 
            </Route>
          </Switch>
        </div>
      </Router>
    );
};
  