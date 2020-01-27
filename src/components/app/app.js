import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../pages/home-page/home-page";
import CardPage from "../pages/cards-page/cards-page";
import ShopHeader from '../shop-header';


const App = props => {
  return (
    <main role="main" className="container ">
      <ShopHeader/>
      <Switch>

        <Route exact path="/" component={HomePage} />
        <Route path="/card" component={CardPage} />
      </Switch>
    </main>
  );
};

export default App;
