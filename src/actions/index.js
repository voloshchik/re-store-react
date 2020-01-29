const booksLoaded = newBooks => {
  return {
    type: "FETCH_BOOKS_SUCCESS",
    payload: newBooks
  };
};

const booksRequest = () => {
  return { type: "FETCH_BOOKS_REQUEST" };
};

const booksError = error => {
  return {
    type: "FETCH_BOOKS_FAILURE",
    payload: error
  };
};
const bookAddedToCart = bookId => {
  return {
    type: "BOOK_ADDED_TO_CART",
    payload: bookId
  };
};
const bookAddedfromCart = bookId => {
  return {
    type: "ADDED_BOOK_TO_CART",
    payload: bookId
  };
};
const fetchBooks = (bookstoreService, dispatch) => () => {
  dispatch(booksRequest());
  bookstoreService
    .getBooks()
    .then(data => {
      dispatch(booksLoaded(data));
    })
    .catch(error => {
      dispatch(booksError(error));
    });
};
export { fetchBooks, bookAddedToCart,bookAddedfromCart };
