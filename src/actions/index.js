export const booksLoaded = newBooks => {
  return {
    type: "BOOKS_LOADED",
    payload: newBooks
  };
};

export const booksRequest = () => {
  return { type: "BOOKS_REQUEST" };
};
