export const booksLoaded = newBooks => {
  return {
    type: "BOOKS_LOADED",
    payload: newBooks
  };
};

export const booksRequest = () => {
  return { type: "BOOKS_REQUEST" };
};

 export const booksError = (error) => {
  return {
    type: 'BOOKS_ERROR',
    payload: error
  };
};