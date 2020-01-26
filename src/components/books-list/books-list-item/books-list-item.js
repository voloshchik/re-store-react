import React from "react";

const BooksListItem = ({ book}) => {
    const {title,autor}=book
  return (
    <>
      <span>{title}</span>
      <span>{autor}</span>
    </>
  );
};

export default BooksListItem;
