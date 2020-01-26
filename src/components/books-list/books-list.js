import React, { Component } from "react";
import BooksListItem from "./books-list-item/books-list-item";
import "./books-list.css";
import { connect } from "react-redux";
import withBookstoreService from "../hoc/with-bookstore-service";
import compose from "../utility/compose";

class BookList extends Component {
  componentDidMount() {
    const { bookstoreService, booksLoaded } = this.props;
    const data = bookstoreService.getBooks();
    console.log("data=", data);
    booksLoaded(data);
  }
  render() {
    console.log("books", this.props.books);
    const { books } = this.props;

    return (
      <div>
        <ul className="list-group list-group-flush">
          {books.map((book, id) => {
            return (
              <li key={id} className="list-group-item ">
                <BooksListItem book={book} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    books: state.books
  };
};
const mapDispatchToProps = dispatch => {
  return {
    booksLoaded: newBooks =>
      dispatch({ type: "BOOKS_LOADED", payload: newBooks })
  };
};
export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookList);
