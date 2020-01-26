import React from "react";
import withBookstoreService from "../hoc/with-bookstore-service";

const App = ({ bookstoreService }) => {
  console.log(bookstoreService.getBooks());
  return (
    <div>
      <h1>App</h1>
    </div>
  );
};

export default withBookstoreService()(App);
