import React, { Component } from "react";
import BooksListItem from "./books-list-item/books-list-item";

export class BoksList extends Component {
  render() {
      debugger
    const { books } = this.props;
    return (
      <div>
        <ul>
          {books.map((book,id) => {
            return (
              <li key={id}>
                <BooksListItem book={book} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default BoksList;
