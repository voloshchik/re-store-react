import React, { Component } from "react";
import BooksListItem from "./books-list-item/books-list-item";
import "./books-list.css";
import { connect } from "react-redux";
import withBookstoreService from "../hoc/with-bookstore-service";
import compose from "../utility/compose";
import {
    booksLoaded,
    booksRequest,
    booksError,
    fetchBooks,
  
    bookAddedfromCart,
    bookAddedToCart
} from '../../actions';
import Spinner from "../spinner/spinner";
import ErrorIndicator from "../error-indicator/error-indicator";

const BooksList = ({ books, onAddedCard }) => {
  return (
    <div>
      <ul className="">
        {books.map((book, id) => {
          return (
            <li key={id} className="  ">
              <BooksListItem
                book={book}
                onAddedCard={() => onAddedCard(book.id)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
class BookListContainer extends Component {
  componentDidMount() {
    this.props.fetchBooks();
  }
  render() {
    const { books, loading, error, onAddedCard } = this.props;
    console.log(loading);
    if (loading) {
      return <Spinner />;
    }
    if (error) {
      console.log(error);
      return <ErrorIndicator />;
    }
    return <BooksList books={books} onAddedCard={onAddedCard} />;
  }
}
const mapStateToProps = state => {
  return {
    books: state.books,
    loading: state.loading,
    error: state.error
  };
};
const mapDispatchToProps = (dispatch, { bookstoreService }) => {
  return {
    fetchBooks: fetchBooks(bookstoreService, dispatch),
    onAddedCard: id => dispatch(bookAddedToCart(id))
  };
};
export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);
