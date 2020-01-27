import React, { Component } from "react";
import BooksListItem from "./books-list-item/books-list-item";
import "./books-list.css";
import { connect } from "react-redux";
import withBookstoreService from "../hoc/with-bookstore-service";
import compose from "../utility/compose";
import { booksLoaded, booksRequest } from '../../actions';
import Spinner from '../spinner/spinner';

class BookList extends Component {
  componentDidMount() {
    const { bookstoreService, booksLoaded,booksRequest } = this.props;
    booksRequest()
    bookstoreService.getBooks().then(data => {
      booksLoaded(data);
    });
  }
  render() {
    console.log("books", this.props.books);
    const { books, loading } = this.props;
    if (loading){
      return <Spinner/>
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
    loading: state.loading
  };
};
const mapDispatchToProps = {
  booksLoaded,booksRequest
};
export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookList);
