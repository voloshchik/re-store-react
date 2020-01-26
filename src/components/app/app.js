import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../pages/home-page";
import CardPage from "../pages/cards-page";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/card" component={CardPage} />
    </Switch>
  );
};

export default App;
