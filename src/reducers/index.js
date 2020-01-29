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
const updateCartItems = (cartItems, item, idx) => {
  if (idx === -1) {
    return [...cartItems, item];
  }

  return [...cartItems.slice(0, idx), item, ...cartItems.slice(idx + 1)];
};
const updateCartItem = (item = {}, book) => {
  const {
    id = book.id,
    title = book.title,
    count = 0,
    total = 0
  } = item;
  return {
    id,
    title,
    count: count + 1,
    total: total + book.price
  };
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
      let newItem = updateCartItem(item, book);
      return {
        ...state,
        cartItems: updateCartItems(state.cartItems, newItem, itemIndex)
      };

    default:
      return state;
  }
};
export default reducer;
