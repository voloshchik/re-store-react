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
  if (item.count === 0) {
    return [...cartItems.slice(0, idx), ...cartItems.slice(idx + 1)];
  }

  if (idx === -1) {
    return [...cartItems, item];
  }

  return [...cartItems.slice(0, idx), item, ...cartItems.slice(idx + 1)];
};
const updateCartItem = (item = {}, book, quantity) => {
  const { id = book.id, title = book.title, count = 0, total = 0 } = item;
  return {
    id,
    title,
    count: count + quantity,
    total: total + quantity * book.price
  };
};
const updateOrder = (state, bookId, quantity) => {
  const { books, cartItems } = state;
  const book = books.find(book => book.id === bookId);
  const itemIndex = cartItems.findIndex(item => item.id === bookId);
  const item = cartItems[itemIndex];
  let newItem = updateCartItem(item, book, quantity);
  return {
    ...state,
    cartItems: updateCartItems(cartItems, newItem, itemIndex)
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
    case "BOOK_ADDED_TO_CART":
      return updateOrder(state, action.payload, +1);
    case "BOOK_REMOVED_FROM_CART":
      return updateOrder(state, action.payload, -1);
    case "ALL_BOOKS_REMOVED_FROM_CART":
      const bookId = action.payload;
      const itemIndex = state.cartItems.findIndex(book => book.id === bookId);
      const item = state.cartItems[itemIndex];
      return updateOrder(state, action.payload, -item.count);
    default:
      return state;
  }
};
export default reducer;
