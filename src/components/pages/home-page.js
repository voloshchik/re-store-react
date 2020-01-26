import React from "react";
import { BoksList } from "../books-list/books-list";

const HomePage = () => {
   const books = [
    { title: "Lesson Js", autor: "Frimen" },
    {
      title: "React",
      autor: "tutorial"
    }
  ];
  return (
    <div>
      <h2>Home Page</h2>
      <BoksList books={books} />
    </div>
  );
};

export default HomePage;
