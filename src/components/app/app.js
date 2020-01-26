import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../pages/home-page/home-page";
import CardPage from "../pages/cards-page/cards-page";
import { connect } from 'react-redux';

const App = (props) => {
  
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/card" component={CardPage} />
    </Switch>
  );
};

export default  App
