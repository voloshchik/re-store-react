import React, { Component } from "react";
import BooksListItem from "./books-list-item/books-list-item";
import "./books-list.css";
import { connect } from "react-redux";
import withBookstoreService from "../hoc/with-bookstore-service";
import compose from "../utility/compose";
import { booksLoaded, booksRequest, booksError } from "../../actions";
import Spinner from "../spinner/spinner";
import ErrorIndicator from "../error-indicator/error-indicator";

class BookList extends Component {
  componentDidMount() {
    const {
      bookstoreService,
      booksLoaded,
      booksRequest,
      booksError
    } = this.props;
    booksRequest();
    bookstoreService
      .getBooks()
      .then(data => {
        booksLoaded(data);
      })
      .catch(error => {
        booksError(error);
      });
  }
  render() {
    const { books, loading, error } = this.props;
    console.log(loading);
    if (loading) {
      return <Spinner />;
    }
    if (error) {
      console.log(error);
      return <ErrorIndicator />;
    }
    return (
      <div>
        <ul className="">
          {books.map((book, id) => {
            return (
              <li key={id} className="  ">
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
    books: state.books,
    loading: state.loading,
    error: state.error
  };
};
const mapDispatchToProps = {
  booksLoaded,
  booksRequest,
  booksError
};
export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookList);
