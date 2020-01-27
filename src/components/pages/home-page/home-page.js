import React from "react";

import  BookList  from "../../books-list/books-list";

import "./home-page.css";
import ShoppingCartTable from '../../shopping-cart-table/shopping-cart-table';
const HomePage = () => {
  return (
    <div>
      <h2>Home Page</h2>
      <BookList  />
      <ShoppingCartTable/>
    </div>
  );
};

export default HomePage;
