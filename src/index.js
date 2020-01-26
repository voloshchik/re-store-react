import ReactDOM from "react-dom";
import App from "./components/app/app";
import React from "react";
import { Provider } from "react-redux";
import BookstoreService from "./services/bookstore-service";
import ErrorBoundary from "./components/error-boundary/error-boundry";
import { BookstoreServiceProvider } from "./components/boockstore-service-context/boockstore-service-context";
import store from "./store";
import { BrowserRouter as Router } from "react-router-dom";

const bookstoreService = new BookstoreService();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <BookstoreServiceProvider value={bookstoreService}>
        <Router>
          <App />
        </Router>
      </BookstoreServiceProvider>
    </ErrorBoundary>
  </Provider>,

  document.getElementById("root")
);
console.log("Hellow react");
