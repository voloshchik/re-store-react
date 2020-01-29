const initialState = {
  books: [],
  loading: true,
  error: null,
  orderTotal: 100,
  cardItems: [
    // {
    //   id: 1,
    //   name: "Book 1",
    //   count: 3,
    //   total: 150
    // },
    // {
    //   id: 2,
    //   name: "Book 2",
    //   count: 2,
    //   total: 70
    // }
  ]
};
const reducer = (state = initialState, action) => {
  
  switch (action.type) {
    case "FETCH_BOOKS_SUCCESS":
      return {
        ...state,
        books: action.payload,
        loading: false,
        error: null
      };
    case "FETCH_BOOKS_REQUEST":
      return {
        ...state,
        books: [],
        loading: true,
        error: null
      };
    case "FETCH_BOOKS_FAILURE":
      return {
        ...state,
        books: [],
        loading: false,
        error: action.payload
      };
    case "ADDED_BOOK_TO_CARD":
    
      const bookId = action.payload ;
      const book = state.books.find(book => book.id === bookId);
      const newItem = {
        id: book.id,
        title: book.title,
        count: 1,
        total: book.price
      };
      return {
        ...state,
        cardItems: [
          ...state.cardItems,
          newItem
        ]
      };
    default:
      return state;
  }
};
export default reducer;
