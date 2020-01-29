const initialState = {
  books: [],
  loading: true,
  error: null,
  orderTotal: 100,
  cartItems: [
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
    case "ADDED_BOOK_TO_CART":
      const bookId = action.payload;
      const book = state.books.find(book => book.id === bookId);
      const itemIndex = state.cartItems.findIndex(item => item.id === bookId);
      const item = state.cartItems[itemIndex];
      let newItem;

      if (item) {
        newItem = {
          ...item,
          count: item.count + 1,
          total: item.total + book.price
        };
      } else {
        newItem = {
          id: book.id,
          title: book.title,
          count: 1,
          total: book.price
        };
      }
      if (itemIndex < 0) {
        return {
          ...state,
          cartItems: [...state.cartItems, newItem]
        };
      } else {
        return {
          ...state,
          cartItems: [
            ...state.cartItems.slice(0, itemIndex),
            newItem,
            ...state.cartItems.slice(itemIndex + 1)
          ]
        };
      }

    default:
      return state;
  }
};
export default reducer;
